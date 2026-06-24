Set shell = CreateObject("WScript.Shell")
root = "C:\Users\PRATIKSHA\OneDrive\Documents\AstroAI"
node = """C:\Program Files\nodejs\node.exe"""

shell.Run "cmd.exe /c cd /d """ & root & """ && " & node & " backend/src/server.js > server.log 2> server.err.log", 0, False
shell.Run "cmd.exe /c cd /d """ & root & """ && " & node & " ai-service/src/server.js > ai-service.log 2> ai-service.err.log", 0, False
shell.Run "cmd.exe /c cd /d """ & root & """ && " & node & " node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5173 > frontend.log 2> frontend.err.log", 0, False
