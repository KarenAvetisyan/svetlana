<?php
$to = "svetlana.babenco@icloud.com";
$from = "info@BezHttpsDomenSaita.ru";
$subject = "New message " . $_SERVER['HTTP_REFERER'];

$find = $_POST['find'];
$name = $_POST['name'];
$email = $_POST['email'];
$textarea = $_POST['textarea'];
$individual = $_POST['individual'];
$city = $_POST['city'];
$address = $_POST['address'];
$phone = $_POST['phone'];



$message = "Клиент:\r\n\r\n";

if (!empty($name)) {
    $message .= "Name: " . $name . "\r\n";
}

if (!empty($email)) {
    $message .= "E-mail: " . $email . "\r\n";
}

if (!empty($textarea)) {
    $message .= "Your messsage: " . $textarea . "\r\n";
}

if (!empty($find)) {
    $message .= "How did you find me?: " . $find . "\r\n";
}


$boundary = md5(date('r', time()));
$headers = "MIME-Version: 1.0\r\n";
$headers .= "From: " . $from . "\r\n";
$headers .= "Reply-To: " . $from . "\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

$body = "--$boundary\r\n";
$body .= "Content-Type: text/plain; charset=\"utf-8\"\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n";
$body .= "\r\n" . $message . "\r\n";

$body .= "--$boundary--";

// if (mail($to, $subject, $body, $headers)) {
//     echo $name . ', Successfully sent!';
// } else {
//     echo 'Error while sending email.';
// }
?>
