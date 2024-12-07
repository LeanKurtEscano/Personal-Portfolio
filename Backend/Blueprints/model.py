import mysql.connector


db_config =  {
    'host':'localhost',
    'user':'root',
    'password':'choulodi321*',  
    'database':'user_profile'  
}
def get_db_connection():
    return mysql.connector.connect(
        **db_config
    )
