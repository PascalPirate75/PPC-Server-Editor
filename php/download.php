<?php

    $file = $_GET['filename'];
    $path = $_GET['filepath'];
    header("Cache-Control: public");
    header("Content-Description: File Transfer");
    header("Content-Disposition: attachment; filename=".$file."");
    header("Content-Transfer-Encoding: binary");
    header("Content-Type: binary/octet-stream");
    readfile($path.$file);

?>


