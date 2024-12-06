from flask import Blueprint, session, jsonify, request
from Blueprints.model import get_db_connection
import bcrypt
cr = Blueprint('cr', __name__)

@cr.route('/create', methods = ["POST"])
def create_user():
    data = request.get_json()
    first_name = data.get('first_name')  
    middle_name = data.get('middle_name')
    last_name = data.get('last_name')
    email = data.get('email')
    contact_number = data.get('contact_number')
    birthday = data.get('birthday')
    age = data.get('age')
    #password = data.get('password')
    
    #hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("SELECT * FROM users_crud WHERE Email = %s",(email,))
        user_email = cursor.fetchone()
        
        if user_email:
            return jsonify({"email": f"Email {email} is already registered."}), 400  
        cursor.execute(
    'INSERT INTO users_crud (Firstname, Middlename, Lastname, Birthday, Age, Contact_number, Email) VALUES (%s, %s, %s, %s, %s, %s, %s)',
    (first_name, middle_name, last_name, birthday, age, contact_number, email))
        
        """
         cursor.execute(
    'INSERT INTO users_crud (Firstname, Middlename, Lastname, Birthday, Age, Contact_number, Email,Password) VALUES (%s, %s, %s, %s, %s, %s, %s,%s)',
    (first_name, middle_name, last_name, birthday, age, contact_number, email,hashed_password))
        
        
        """
        
        conn.commit()
        return jsonify({"success": "User Created"}), 200


    except Exception as e:
        print(f"{e}")
        return jsonify({"error": "Failed to Create User"}), 500
        
    finally:
        
        if cursor:
            cursor.close()
            
        if conn:
            conn.close()
        
    
@cr.route('/read', methods=["GET"])
def users_data():
    try:
       
        conn = get_db_connection()
        cursor = conn.cursor()

       
        cursor.execute("SELECT id, Firstname, Middlename, Lastname, Birthday, Age, Contact_number, Email FROM users_crud")
        rows = cursor.fetchall()

        #main account
        #main_account_id = 1
        
        users = [
            {
                "id": row[0],
                "firstname": row[1],
                "middlename": row[2],
                "lastname": row[3],
                "birthday": row[4].isoformat() if row[4] else None,  
                "age": row[5],
                "contact_number": row[6],
                "email": row[7],
            }
            for row in rows  # for row in rows if row[0] != main_account_id
        ]

       
        return jsonify({"data": users}), 200

    except Exception as e:
       
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
      
        if conn:
            conn.close()


@cr.route('/delete/<int:user_id>', methods=["DELETE"])
def delete_user(user_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Check if user exists
        cursor.execute("SELECT id FROM users_crud WHERE id = %s", (user_id,))
        user = cursor.fetchone()

        if not user:
            return jsonify({"error": "User not found"}), 404

    
        cursor.execute("DELETE FROM users_crud WHERE id = %s", (user_id,))
        conn.commit()

        return jsonify({"message": "User deleted successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


@cr.route("/users/<int:id>", methods=["POST"])
def update_profile(id):
    try:
        data = request.get_json()

        first_name = data.get('first_name')
        middle_name = data.get('middle_name')
        last_name = data.get('last_name')
        email = data.get('email')
        contact_number = data.get('contact_number')
        birthday = data.get('birthday')
        age = data.get('age')

        # Validation checks for required fields
        if not all([first_name, last_name, email, middle_name, age, contact_number]):
            return jsonify({"error": "All fields are required"}), 400

        conn = get_db_connection()
        cursor = conn.cursor()
        
        
        cursor.execute("SELECT * FROM users_crud WHERE id = %s", (id,))
        current_data = cursor.fetchone()

       
        if not current_data:
            return jsonify({"error": "User not found"}), 404

        
        current_email = current_data[7]  

    
        if email != current_email:
            
            cursor.execute("SELECT * FROM users_crud WHERE Email = %s", (email,))
            user_email = cursor.fetchone()
            if user_email:
                return jsonify({"email": f"Email {email} is already registered."}), 400

      
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
            UPDATE users_crud 
            SET Firstname = %s, Middlename = %s, Lastname = %s, Birthday = %s, Age = %s, Contact_number = %s, Email = %s
            WHERE id = %s
        """, (first_name, middle_name, last_name, birthday, age, contact_number, email, id))
        conn.commit()

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
        if conn:
            conn.close()


@cr.route("/user/<int:id>", methods=["POST"])
def get_user(id):
  
    
    db = get_db_connection()
    cursor = db.cursor()

   
    cursor.execute("SELECT * FROM users_crud WHERE id = %s", (id,))
    user = cursor.fetchone()

    if not user:
        return jsonify({"error": "User not found"}), 404

    print(user[4])
    profile_data = {
        "first_name": user[1],
        "middle_name": user[2],
        "last_name": user[3],
        "birthday": user[4],
        "age": user[5],
        "contact_number": user[6],
        "email": user[7],
    }
    
    cursor.close()
    db.close()

    return jsonify(profile_data), 200