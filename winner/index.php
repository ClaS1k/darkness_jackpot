<head>
  <meta charset="utf-8">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <link rel="stylesheet" href="main.css">
  <script src="script.js"></script>
</head>
<body>
    <?php
        $dbc=mysqli_connect('esc1162203.mysql', 'esc1162203_mysql', 'sC:a2sEi', 'esc1162203_db', '3306');
        
        $exeptions=array(3053, 3032, 3026, 3025, 3030, 3024);
        //                       Ибрагим и компания
        
        $sql="SELECT * FROM `jackpot_data` WHERE `id`='1'";
        $result=mysqli_query($dbc, $sql);
        $row=mysqli_fetch_array($result, MYSQLI_ASSOC);
        $winner_sum=$row['summa'];
        
        $init=0;
        while($init==0){
            $sql="SELECT * FROM `computers` WHERE `player_id`<>'0' ORDER BY rand() LIMIT 1";
            $result=mysqli_query($dbc, $sql);
            $row=mysqli_fetch_array($result, MYSQLI_ASSOC);
            $exept_check=array_search($row['player_id'], $exeptions);
            if(!$exept_check){
                $init=1;
                $winner_id=$row['player_id'];
            }
        }
        
        
        $ch = curl_init("http://5.228.174.10/api/users/$winner_id");
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_USERPWD, "darkness_app:darkness2021");
        $json=json_decode(substr(curl_exec($ch), 1));
        curl_close($ch);
        
        $winner_name=$json->result->username;
        
        
        
        $ch = curl_init("http://5.228.174.10/api/users/$winner_id/deposit/$winner_sum/-2");
        curl_setopt($ch, CURLOPT_PUT, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_USERPWD, "darkness_app:darkness2021");
        //curl_exec($ch);
        curl_close($ch);
    ?>
  <img class="background" src="bgjack.jpg"></div>
  <div class="animated-title">
  <div class="text-top">
    <div>
      <span>Джекпот <?php echo "19949" ?>р</span>
      <span>Получает игрок</span>
    </div>
  </div>
  <div class="text-bottom">
    <div><?php echo "princess" ?></div>
  </div>
</div>
</body>
