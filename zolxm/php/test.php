<?php


// header("Content-Type:text/html;charset=utf8");
// $data = file_get_contents("https://login.dangdang.com/p/region.php?parent_id=9000&_=1612224782971");

// // print_r(json_encode($data));
// echo $data;



header("Content-Type:text/html;charset=utf-8");  
$url = "https://login.dangdang.com/p/region.php?parent_id=9000&_=1612224782971"; 
$html = file_get_contents($url); 
$html = iconv("gbk", "utf-8//IGNORE"); 
echo $html;