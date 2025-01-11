<?php
class ChatUser
{
    private $user_id;
    private $user_email;
    private $user_password;
    public $connect;

    public function __construct()
    {
        require_once('./config/db.php');
        $database_object = new Database_connection();
        $this->connect = $database_object->connect();
    }

    public function setUserEmail($user_email)
    {
        $this->user_email = $user_email;
    }

    public function setUserPassword($user_password)
    {
        $this->user_password = $user_password;
    }


    public function validate_user_login($email, $password)
    {
        $query = "SELECT * FROM userdata WHERE email = :email";
        $statement = $this->connect->prepare($query);
        $statement->bindParam(':email', $email);

        if ($statement->execute()) {
            if ($statement->rowCount() > 0) {
                $user_data = $statement->fetch(PDO::FETCH_ASSOC);


                if (password_verify($password, $user_data['password'])) {
                    return $user_data;
                }
            }
        }
        return false;
    }


    public function get_user_all_data()
    {
        try {
            $query = "SELECT id, username, email
                      FROM userdata";
            $statement = $this->connect->prepare($query);
            $statement->execute();
            return $statement->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            die("Error fetching user data: " . $e->getMessage());
        }
    }
}
