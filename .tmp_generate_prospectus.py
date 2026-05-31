from pathlib import Path

base = Path(r'\\wsl.localhost\Ubuntu-22.04\var\www\cohorts\cs-year-1\assets\degrees')
base.mkdir(parents=True, exist_ok=True)
path = base / 'UFT_University_Prospectus.pdf'
content = """BT
/F1 28 Tf
72 770 Td
(UFT University Prospectus 2026) Tj
/F1 13 Tf
0 -34 Td
(Excellence in innovation, ethics, research, and student success.) Tj
0 -24 Td
(Logo mark: UFT University) Tj
0 -28 Td
(ACADEMIC PATHWAYS) Tj
/F1 11 Tf
0 -18 Td
(Undergraduate: Computer Science, Engineering, Business, Law, Health Sciences) Tj
0 -16 Td
(Postgraduate: AI, Data Science, MBA, Law, Research Degrees) Tj
0 -16 Td
(Digital Learning: short courses, certificates, and industry routes) Tj
0 -28 Td
(STUDENT EXPERIENCE) Tj
0 -16 Td
(Clubs, sport, volunteering, libraries, and campus support) Tj
0 -28 Td
(ADMISSIONS AND SUPPORT) Tj
0 -16 Td
(Apply online, book a consultation, and review fees and funding.) Tj
0 -16 Td
(Discover placements, scholarships, research, and global exchange.) Tj
ET
"""
stream = content.encode('ascii')
pieces = [b'%PDF-1.4\n']
offsets = []

def add(obj_bytes):
    offsets.append(sum(len(p) for p in pieces))
    pieces.append(obj_bytes)

add(b'1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n')
add(b'2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n')
add(b'3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n')
add(b'4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n')
add(b'5 0 obj\n<< /Length ' + str(len(stream)).encode('ascii') + b' >>\nstream\n' + stream + b'endstream\nendobj\n')
startxref = sum(len(p) for p in pieces)
with open(path, 'wb') as f:
    for part in pieces:
        f.write(part)
    f.write(b'xref\n0 6\n')
    f.write(b'0000000000 65535 f \n')
    for off in offsets:
        f.write(f'{off:010d} 00000 n \n'.encode('ascii'))
    f.write(b'trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n')
    f.write(str(startxref).encode('ascii'))
    f.write(b'\n%%EOF\n')
print(path)
