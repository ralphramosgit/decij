from flask import Blueprint, request, jsonify
import os
from groq import Groq
import json
import re

analyzer_bp = Blueprint('analyzer', __name__)

# Create blueprint instead of app
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if GROQ_API_KEY:
    try:
        client = Groq(api_key=GROQ_API_KEY)
    except Exception as e:
        print(f"Error initializing Groq client: {e}")
        client = None
else:
    print("Warning: GROQ_API_KEY not found in environment variables")
    client = None

def clean_json_response(content):
    """Clean and extract JSON from response"""
    content = re.sub(r'```json\s*', '', content)
    content = re.sub(r'```\s*$', '', content)
    content = re.sub(r'```', '', content)
    
    json_match = re.search(r'\{.*\}', content, re.DOTALL)
    if json_match:
        content = json_match.group(0)
    
    content = re.sub(r',\s*}', '}', content)
    content = re.sub(r',\s*]', ']', content)
    content = re.sub(r"'", '"', content)
    
    return content.strip()

@analyzer_bp.route('/api/analyze-career', methods=['POST'])
def analyze_career():
    try:
        if not client:
            return jsonify({'error': 'Groq API not configured'}), 500
        
        data = request.get_json()
        career_title = data.get('careerTitle', '').strip()
        
        if not career_title:
            return jsonify({'error': 'Career title is required'}), 400
        
        prompt = f"""Analyze the career "{career_title}" and return a JSON object with exactly these fields:
{{
  "description": "2-3 sentence description of what this career involves",
  "locations": ["City, State", "City, State", "City, State"],
  "salaryRange": "$XX,XXX - $XXX,XXX annually", 
  "keySkills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "certifications": ["cert1", "cert2", "cert3", "cert4", "cert5"]
}}

For certifications, provide Atleast 5 specific, industry-relevant certifications for this career. 
Include actual certification names, vendor certifications, professional licenses, or specialized training programs that are 
commonly required or valued in this field. If fewer than 3 exist, supplement with relevant professional development options.

Return only valid JSON, no explanations."""

        completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a career analyst. Return only valid JSON."},
                {"role": "user", "content": prompt}
            ],
            model="llama3-8b-8192",
            temperature=0.1,
            max_tokens=800,
        )
        
        content = completion.choices[0].message.content.strip()
        
        # Add debugging
        print(f"Raw API response: {content}")
        
        try:
            cleaned_content = clean_json_response(content)
            print(f"Cleaned content: {cleaned_content}")
            result = json.loads(cleaned_content)
            
            required_fields = ['description', 'locations', 'salaryRange', 'keySkills', 'certifications']
            for field in required_fields:
                if field not in result:
                    raise ValueError(f"Missing field: {field}")
            
            return jsonify(result)
            
        except (json.JSONDecodeError, ValueError) as e:
            print(f"Parse error: {e}, Content: {content}")
            
            # More specific fallback based on career type
            if any(word in career_title.lower() for word in ['developer', 'programmer', 'software', 'engineer']):
                certs = ["AWS Certified Developer", "Microsoft Azure Fundamentals", "CompTIA Security+", "Certified Scrum Master", "Oracle Java Certification"]
            elif any(word in career_title.lower() for word in ['nurse', 'medical', 'healthcare']):
                certs = ["RN License", "BLS Certification", "ACLS Certification", "Nursing Specialty Certification", "CPR Certification"]
            elif any(word in career_title.lower() for word in ['teacher', 'education', 'instructor']):
                certs = ["Teaching License", "ESL Certification", "Special Education Certification", "Continuing Education Units", "Subject Area Endorsement"]
            elif any(word in career_title.lower() for word in ['data', 'analyst', 'scientist']):
                certs = ["Google Data Analytics Certificate", "Microsoft Power BI Certification", "Tableau Desktop Specialist", "AWS Machine Learning", "Python Data Science Certification"]
            else:
                certs = ["Professional Development Certificate", "Industry Training Program", "Continuing Education Course", "Professional Association Membership", "Leadership Development Program"]
            
            fallback = {
                "description": f"{career_title} is a professional role that requires specialized skills and knowledge.",
                "locations": ["New York, NY", "San Francisco, CA", "Austin, TX"],
                "salaryRange": "$50,000 - $120,000 annually",
                "keySkills": ["Communication", "Problem Solving", "Technical Skills", "Teamwork", "Analytical Thinking"],
                "certifications": certs
            }
            return jsonify(fallback)
            
    except Exception as e:
        print(f"API Error: {e}")
        return jsonify({'error': 'Failed to analyze career'}), 500