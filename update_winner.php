<?php

$dbc=mysqli_connect('esc1162203.mysql', 'esc1162203_mysql', 'sC:a2sEi', 'esc1162203_db', '3306');

$sql="SELECT * FROM `computers` WHERE `player_id`<>'0' ORDER BY rand() LIMIT 1";
$result=mysqli_query($dbc, $sql);
$row=mysqli_fetch_array($result, MYSQLI_ASSOC);
$user_id=$row['player_id'];

$ch = curl_init("http://5.228.174.10/api/users/$user_id");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_USERPWD, "darkness_app:darkness2021");
$json = curl_exec($ch);
curl_close($ch);

$json=json_decode($json);

$user_login=$json->result->username;
echo $user_login;

?>