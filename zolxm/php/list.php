<?php
include "conn.php";

$result=$conn->query("select * from shoplist"); 
$num = $result->num_rows; 
$pagesize = 10; 

$pagenum = ceil($num / $pagesize); 
if (isset($_GET['page'])) {
    $pagevalue = $_GET['page'];
} else {
    $pagevalue = 1;
}

$page = ($pagevalue - 1) * $pagesize; 
$sql1 = "select * from shoplist limit $page,$pagesize";
$res = $conn->query($sql1);


$arr = array();
for ($i = 0; $i < $res->num_rows; $i++) {
    $arr[$i] = $res->fetch_assoc();
}
class pagedata{

}
$page = new pagedata();
$page->pagesize =  $pagenum; 
$page->pagecontent = $arr;
echo json_encode($page);




