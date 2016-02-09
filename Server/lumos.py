from flask import Flask
app = Flask(__name__)

@app.route('/lightOn')
def lightOn():
    return 'Lights Turned on'

@app.route('/lightOff')
def lightOff():
    return 'Lights Turned off'

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)