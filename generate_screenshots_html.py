import html
import os

TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code Screenshot</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet" />
    <style>
        body {{ margin: 0; padding: 40px; background: #1e1e1e; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: 'Fira Code', monospace; }}
        .window {{ background: #2d2d2d; border-radius: 12px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); overflow: hidden; width: 900px; }}
        .header {{ background: #3c3c3c; padding: 12px 20px; display: flex; align-items: center; gap: 8px; }}
        .dot {{ width: 12px; height: 12px; border-radius: 50%; }}
        .red {{ background: #ff5f56; }}
        .yellow {{ background: #ffbd2e; }}
        .green {{ background: #27c93f; }}
        .title {{ margin-left: 16px; color: #999; font-size: 14px; font-family: sans-serif; }}
        pre {{ margin: 0 !important; border-radius: 0 !important; padding: 20px !important; max-height: 800px; overflow: hidden; }}
        /* Hide scrollbar */
        ::-webkit-scrollbar {{ display: none; }}
    </style>
</head>
<body>
    <div class="window">
        <div class="header">
            <div class="dot red"></div>
            <div class="dot yellow"></div>
            <div class="dot green"></div>
            <div class="title">{filename}</div>
        </div>
        <pre><code class="language-{lang}">{code}</code></pre>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-jsx.min.js"></script>
</body>
</html>"""

FILES = [
    ('backend/data_processor.py', 'python'),
    ('backend/app.py', 'python'),
    ('frontend/src/components/Dashboard.jsx', 'jsx')
]

BASE_DIR = '/Users/adityachaudhary/.gemini/antigravity/scratch/fifa_dashboard'

for rel_path, lang in FILES:
    full_path = os.path.join(BASE_DIR, rel_path)
    with open(full_path, 'r') as f:
        code = f.read()
    
    # Escape HTML
    escaped_code = html.escape(code)
    
    # Generate HTML
    filename = os.path.basename(rel_path)
    html_content = TEMPLATE.format(filename=filename, lang=lang, code=escaped_code)
    
    output_filename = f"code_shot_{filename.replace('.', '_')}.html"
    with open(os.path.join(BASE_DIR, output_filename), 'w') as f:
        f.write(html_content)
    
    print(f"Generated {output_filename}")
