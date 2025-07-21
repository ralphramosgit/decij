from flask import Blueprint, request, jsonify
import os
from groq import Groq
import json
import re

# Load environment variables
# load_dotenv('../.env')

# Create blueprint
roadmap_bp = Blueprint('roadmap', __name__)

# Initialize Groq client
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if GROQ_API_KEY:
    try:
        client = Groq(api_key=GROQ_API_KEY)
        print("Roadmap Groq client initialized successfully")
    except Exception as e:
        print(f"Error initializing Groq client in roadmap: {e}")
        client = None
else:
    print("Warning: GROQ_API_KEY not found in environment variables")
    client = None

@roadmap_bp.route('/api/career-roadmap', methods=['POST'])
def career_roadmap():
    try:
        if not client:
            return jsonify({'error': 'Groq API not configured'}), 500

        data = request.get_json()
        career_title = data.get('careerTitle', '').strip()
        
        if not career_title:
            return jsonify({'error': 'Career title is required'}), 400
        
        prompt = f"""Create a detailed career roadmap for "{career_title}" and return a JSON object with exactly these fields:
{{
  "mermaidDiagram": "flowchart TD\\n    A[Start Here] --> B[Education]\\n    B --> C[Skills]\\n    C --> D[Projects]\\n    D --> E[Career]",
  "roadmapData": {{
    "education": {{
      "degree": "Required degree type",
      "courses": ["Course 1", "Course 2", "Course 3", "Course 4", "Course 5"]
    }},
    "certifications": ["Cert 1", "Cert 2", "Cert 3", "Cert 4", "Cert 5"],
    "skills": {{
      "technical": ["Tech Skill 1", "Tech Skill 2", "Tech Skill 3"],
      "soft": ["Soft Skill 1", "Soft Skill 2", "Soft Skill 3"]
    }},
    "projects": ["Project Type 1", "Project Type 2", "Project Type 3"],
    "interviewPrep": ["Common Question 1", "Common Question 2", "Common Question 3"],
    "timeline": [
      {{
        "phase": "Months 1-6",
        "focus": "Foundation Building",
        "activities": ["Activity 1", "Activity 2"]
      }},
      {{
        "phase": "Months 6-12", 
        "focus": "Skill Development",
        "activities": ["Activity 1", "Activity 2"]
      }},
      {{
        "phase": "Year 2+",
        "focus": "Career Growth",
        "activities": ["Activity 1", "Activity 2"]
      }}
    ]
  }}
}}

Create a comprehensive Mermaid flowchart that shows the complete career path from education to professional success. Include nodes for education, skills, certifications, projects, and career milestones.

Return only valid JSON, no explanations."""

        completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a career counselor expert in creating detailed roadmaps. Return only valid JSON with Mermaid syntax."},
                {"role": "user", "content": prompt}
            ],
            model="llama3-8b-8192",
            temperature=0.2,
            max_tokens=1500,
        )
        
        content = completion.choices[0].message.content.strip()
        print(f"Raw roadmap response: {content}")
        
        try:
            # Clean and parse JSON
            content = re.sub(r'```json\s*', '', content)
            content = re.sub(r'```\s*$', '', content)
            content = re.sub(r'```', '', content)
            
            json_match = re.search(r'\{.*\}', content, re.DOTALL)
            if json_match:
                content = json_match.group(0)
            
            result = json.loads(content)
            
            required_fields = ['mermaidDiagram', 'roadmapData']
            for field in required_fields:
                if field not in result:
                    raise ValueError(f"Missing field: {field}")
            
            return jsonify(result)
            
        except (json.JSONDecodeError, ValueError) as e:
            print(f"Roadmap parse error: {e}")
            
            # Fallback with basic Mermaid diagram
            fallback = {
                "mermaidDiagram": f"""flowchart TD
    A[Start: {career_title} Journey] --> B[Education Phase]
    B --> B1[Get Degree]
    B --> B2[Take Courses]
    B1 --> C[Skills Development]
    B2 --> C
    C --> C1[Technical Skills]
    C --> C2[Soft Skills]
    C1 --> D[Build Projects]
    C2 --> D
    D --> E[Get Certifications]
    E --> F[Apply for Jobs]
    F --> G[Interview Prep]
    G --> H[Land {career_title} Role]
    H --> I[Career Growth]""",
                "roadmapData": {
                    "education": {
                        "degree": "Bachelor's degree in relevant field",
                        "courses": ["Fundamentals Course", "Advanced Course", "Practical Course", "Capstone Project", "Electives"]
                    },
                    "certifications": ["Entry Level Cert", "Professional Cert", "Advanced Cert", "Specialty Cert", "Leadership Cert"],
                    "skills": {
                        "technical": ["Core Technical Skill", "Programming/Tools", "Industry Software"],
                        "soft": ["Communication", "Problem Solving", "Teamwork"]
                    },
                    "projects": ["Beginner Project", "Intermediate Project", "Advanced Portfolio Project"],
                    "interviewPrep": ["Tell me about yourself", "Why this career?", "Technical scenario question"],
                    "timeline": [
                        {
                            "phase": "Months 1-6",
                            "focus": "Foundation Building",
                            "activities": ["Complete basic education", "Learn fundamentals"]
                        },
                        {
                            "phase": "Months 6-12",
                            "focus": "Skill Development", 
                            "activities": ["Build projects", "Get certifications"]
                        },
                        {
                            "phase": "Year 2+",
                            "focus": "Career Launch",
                            "activities": ["Apply for positions", "Network actively"]
                        }
                    ]
                }
            }
            return jsonify(fallback)
            
    except Exception as e:
        print(f"Roadmap API Error: {e}")
        return jsonify({'error': 'Failed to create career roadmap'}), 500