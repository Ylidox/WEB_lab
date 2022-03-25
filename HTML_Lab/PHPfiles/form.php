<?php

define('TELEGRAM_TOKEN', '5274616297:AAEWo5OZs9-IGDr7q3CnpV5yJlrCYMj7OWY');

define('TELEGRAM_CHATID', '733176205');

function message_to_telegram($text)
{
    $ch = curl_init();
    curl_setopt_array(
        $ch,
        array(
            CURLOPT_URL => 'https://api.telegram.org/bot' . TELEGRAM_TOKEN . '/sendMessage',
            CURLOPT_POST => TRUE,
            CURLOPT_RETURNTRANSFER => TRUE,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_POSTFIELDS => array(
                'chat_id' => TELEGRAM_CHATID,
                'text' => $text,
            ),
        )
    );
    curl_exec($ch);
}

if(isset($_POST["firstname"])) 
{

	$name = htmlentities($_POST["firstname"]);
	$email = htmlentities($_POST["email"]);
	$message = htmlentities($_POST["message"]);
	$output ="
	<html>
	<head>
	<title>Анкетные данные</title>
	</head>
	<body>
	Вас зовут: $name<br/>
	Email: $email<br/>
	Сообщение: $message<br />";
	$output.="</body></html>";
	echo $output;

	message_to_telegram("User: $name
	Email: $email\n
	Message: $message");
}
else
{   
    echo "Введенные данные некорректны";
}
?>