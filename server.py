from flask import Flask, render_template

app = Flask(__name__)

from routes.route import *

if __name__ == "__main__":
    host = "127.0.0.1"
    port = "8000"
    app.run(host=host, port=port, debug=True)

