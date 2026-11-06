import http.server
import socketserver
import os

PORT = 8080
DIRECTORY = r"C:\Users\Ishfak Ahmed Afiq\Documents\Ludo cricket Turnament\dino-game"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

print(f"Serving at http://localhost:{PORT}")
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    httpd.serve_forever()
