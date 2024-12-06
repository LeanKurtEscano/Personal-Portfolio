from flask import Blueprint, session, jsonify, request
from Blueprints.model import get_db_connection

pr = Blueprint('pr', __name__)


@pr.route("/profile", methods=["POST"])
def get_profile():
    user_id = 1  # Assuming the user_id is hardcoded for now
    db = None
    cursor = None

    try:
        
        db = get_db_connection()
        cursor = db.cursor()

       
        cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
        user = cursor.fetchone()

        if not user:
            return jsonify({"error": "User not found"}), 404

      
        profile_data = {
            "first_name": user[1],
            "middle_name": user[2],
            "last_name": user[3],
            "birthday": user[4],
            "age": user[5],
            "contact_number": user[6],
            "email": user[7],
        }

       
        return jsonify(profile_data), 200

    except Exception as err:
        
        print(f"Error: {err}")
        return jsonify({"error": f"An error occurred: {err}"}), 500
    
    finally:
       
        if cursor:
            cursor.close()
        if db:
            db.close()



@pr.route("/update", methods=["POST"])
def update_profile():
    try:
        user_id = 1  
        data = request.get_json()

        first_name = data.get('first_name')
        middle_name = data.get('middle_name')
        last_name = data.get('last_name')
        email = data.get('email')
        contact_number = data.get('contact_number')
        birthday = data.get('birthday')
        age = data.get('age')

       
        if not all([first_name, last_name, email, middle_name, age, contact_number]):
            return jsonify({"error": "All fields are required"}), 400

        db = get_db_connection()
        cursor = db.cursor()

        cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
        current_data = cursor.fetchone()
        
        if not current_data:
            return jsonify({"error": "User not found"}), 404

        
        current_email = current_data[7]  

    
        if email != current_email:
            
            cursor.execute("SELECT * FROM users_crud WHERE Email = %s", (email,))
            user_email = cursor.fetchone()
            if user_email:
                return jsonify({"email": f"Email {email} is already registered."}), 400


        # Check if there are any changes to the data
        if current_data and (
            first_name == current_data[1] and
            middle_name == current_data[2] and
            last_name == current_data[3] and
            birthday == current_data[4] and
            age == current_data[5] and
            contact_number == current_data[6] and
            email == current_data[7]
        ):
            return jsonify({"success": "No changes made to the profile"}), 200

       
        cursor.execute("""
            UPDATE users 
            SET Firstname = %s, Middlename = %s, Lastname = %s, Birthday = %s, Age = %s, Contact_number = %s, Email = %s
            WHERE id = %s
        """, (first_name, middle_name, last_name, birthday, age, contact_number, email, user_id))
        db.commit()

      
        print(f"Rows affected by update: {cursor.rowcount}")

        if cursor.rowcount > 0:
            return jsonify({"success": "Profile updated successfully"}), 200
        else:
            
            return jsonify({"info": "No changes detected or applied"}), 200

    except Exception as err:
      
        print(f"Error: {err}")
        return jsonify({"error": f"An error occurred: {err}"}), 500
    finally:
        
        if cursor:
            cursor.close()
        if db:
            db.close()
