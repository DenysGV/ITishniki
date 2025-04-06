<?php
// Подключаем автозагрузчик Composer
require 'vendor/autoload.php'; // Это подключит все зависимости, включая PHPMailer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$form_type = $_POST['form_type'] ?? '';

// Инициализация PHPMailer
$mail = new PHPMailer(true);

try {
   // Настройки SMTP
   $mail->isSMTP();
   $mail->Host = 'smtp.gmail.com'; // Укажите SMTP сервер (например, smtp.gmail.com)
   $mail->SMTPAuth = true;
   $mail->Username = 'school.it.dev@gmail.com'; // Ваша почта
   $mail->Password = 'vfcd rayv jgrs imcr'; // Ваш пароль от почты (используйте App Password, если включена двухфакторная аутентификация)
   $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
   $mail->Port = 587;

   // Получатель письма
   $mail->setFrom('school.it.dev@gmail.com', 'Website Form'); // Укажите свою почту
   $mail->addAddress('school.it.dev@gmail.com', 'Recipient Name'); // Укажите почту, куда будет отправляться сообщение

   // Для "modalForm"
   if ($form_type === 'modal') {
      $name = htmlspecialchars($_POST['name'] ?? '');
      $phone = htmlspecialchars($_POST['phone'] ?? '');
      $contact = htmlspecialchars($_POST['contact'] ?? '');

      $message = "📩 <b>Нова заявка на навчання</b>\n";
      $message .= "👤 Ім’я: $name\n";
      $message .= "📞 Телефон: $phone\n";
      $message .= "📲 Спосіб зв’язку: $contact";
   }
   // Для "contact__form"
   elseif ($form_type === 'contact') {
      $phone = htmlspecialchars($_POST['phone'] ?? '');

      $message = "📩 <b>Нова заявка о зв'язку</b>\n";
      $message .= "📞 Телефон: $phone";
   } else {
      echo 'Invalid form';
      exit;
   }

   // Настроим сообщение
   $mail->isHTML(true);
   $mail->CharSet = 'UTF-8';
   $mail->Subject = 'Нова заявка с вашего сайта';
   $mail->Body    = $message;

   // Отправка письма
   if ($mail->send()) {
      echo 'Message sent to email successfully';
   } else {
      echo 'Message could not be sent. Error: ' . $mail->ErrorInfo;
   }
} catch (Exception $e) {
   echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
