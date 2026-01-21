from fpdf import FPDF
import datetime
import os

class IncidentReport(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 15)
        self.cell(0, 10, 'Cyber Security Incident Report', 1, 1, 'C')
        self.ln(10)

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

def generate_complaint_pdf(attack_details):
    pdf = IncidentReport()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    pdf.cell(200, 10, txt=f"Date: {timestamp}", ln=1, align='L')
    pdf.ln(10)
    
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(200, 10, txt="Incident Details:", ln=1, align='L')
    pdf.set_font("Arial", size=12)
    
    content = [
        f"Attacker IP: {attack_details.get('attacker_ip', 'Unknown')}",
        f"Attacker MAC: {attack_details.get('attacker_mac', 'Unknown')}",
        f"Attack Type: {attack_details.get('attack_type', 'MITM / Spoofing')}",
        f"Risk Score: {attack_details.get('risk_score', 'N/A')}",
        f"Detected By: Suraksha Chakra Engine",
    ]
    
    for line in content:
        pdf.cell(200, 10, txt=line, ln=1, align='L')
        
    pdf.ln(20)
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(200, 10, txt="Action Required:", ln=1, align='L')
    pdf.set_font("Arial", size=12)
    pdf.multi_cell(0, 10, txt="This report is generated automatically by the Ethical Hacking App. Please submit this to your local Police Station or Cyber Cell.")

    if not os.path.exists('backend/reports'):
        os.makedirs('backend/reports', exist_ok=True)
        
    filename = f"backend/reports/incident_{timestamp.replace(':','-').replace(' ','_')}.pdf"
    pdf.output(filename)
    return filename
