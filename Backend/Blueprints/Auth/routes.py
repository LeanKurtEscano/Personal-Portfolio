from flask import Blueprint, session, jsonify, request
import bcrypt
from Blueprints.model import get_db_connection

lg = Blueprint('lg', __name__)

@lg.route('/auth', methods=['POST'])
def user_auth():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    
    if not username or not password:
        return jsonify({"invalid": "Username and password are required"}), 400

    db = get_db_connection()
    cursor = db.cursor()

   
    cursor.execute("SELECT * FROM users WHERE Firstname = %s", (username,))
    user = cursor.fetchone()

 
    if not user:
        return jsonify({"user": "User not found"}), 404

    #get the password
    stored_hashed_password = user[8] 

    # Check if the entered password matches the stored hashed password
    if bcrypt.checkpw(password.encode('utf-8'), stored_hashed_password.encode('utf-8')):
       
        session['loggedin'] = user[0]  
        return jsonify({"success": "Login successful","session": session['loggedin']}), 200
    else:
       
        return jsonify({"password": "Invalid password"}), 401

@lg.route("/logout",methods=["POST"])
def user_logout():
    session.clear()
    return jsonify({"success": "User has logout"}),200


@lg.route("/check_login")
def check_login():
    if 'loggedin' in session:
        return jsonify({"logged_in": "User is Log in", "user": session['user']}), 200
    return jsonify({"error": "User is not login" }), 401
