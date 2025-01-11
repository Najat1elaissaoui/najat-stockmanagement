<?php 

class ChatRooms
{
    private $chat_id;
    private $user_id;
    private $message;
    private $created_on;
    protected $connect;

    // Constructor for setting up the database connection
	public function __construct()
	{
		require_once("./config/db.php");
	
		$database_object = new Database_connection();
		$this->connect = $database_object->connect();
	
		if (!$this->connect) {
			die("Connection failed: " . $this->connect->errorInfo());
		}
	}
	

    // Getters and Setters
    public function setChatId($chat_id)
    {
        $this->chat_id = $chat_id;
    }

    public function getChatId()
    {
        return $this->chat_id;
    }

    public function setUserId($user_id)
    {
        $this->user_id = $user_id;
    }

    public function getUserId()
    {
        return $this->user_id;
    }

    public function setMessage($message)
    {
        $this->message = $message;
    }

    public function getMessage()
    {
        return $this->message;
    }

    public function setCreatedOn($created_on)
    {
        $this->created_on = $created_on;
    }

    public function getCreatedOn()
    {
        return $this->created_on;
    }

    // Fetch all chat data
    public function get_all_chat_data() 
    {
        $query = "SELECT * FROM chatrooms ORDER BY created_on ASC";
        $stmt = $this->connect->prepare($query);
        $stmt->execute();

     
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

       public function save_message($user_id, $message)
{
    try {
        $stmt = $this->connect->prepare("INSERT INTO chatrooms (user_id, msg, created_on) VALUES (?, ?, NOW())");
        $stmt->execute([$user_id, $message]);
        
        if ($stmt->rowCount() > 0) {
            echo "Message saved successfully!";
        } else {
            echo "Failed to save message.";
        }
    } catch (PDOException $e) {
        error_log($e->getMessage(), 3, '/path/to/error.log');
        echo "Error: " . $e->getMessage();
    }
    
}

}

?>
