<?php

$dbc=mysqli_connect('esc1162203.mysql', 'esc1162203_mysql', 'sC:a2sEi', 'esc1162203_db', '3306');

$sql="SELECT * FROM `jackpot_data` WHERE `id`='1'";
$result=mysqli_query($dbc, $sql);
$row=mysqli_fetch_array($result, MYSQLI_ASSOC);

$last_transaction=$row['last_update'];
$jackpot_summa=$row['summa'];
$exeption_list=array("Аква Минерали ", "Пепси Кола 0.5", "Пепси Вайлд Черри 0.5","Севен Ап 0.5","Миринда  0.5","Маутин Дью  0.5","Липтон 0.5", "Адреналин Раш 0.5",
"Драйв Ми 0.5", "Пепси Кола 0.33", "Севен Ап 0.33", "Seven Up 0.5", "Миринда 0.33", "Маутин Дью  0.33", "Липтон 0.33", "Лейз 90г", "Читос 55г", 
"Twix", "Сникерс", "Баунти", "Кола 0.33", "Монстер 0.5", "Кола 0.5", "Сэндвич", "Круассан", "Торнадо 0.5", "Марс", "Милки Вей", "Твикс", "Горилла (Зел)",
"Адрик (Классик) ", "Горилла (Манго)", "Адрик (Красный)", "Адрик (Жёлтый) ", "Ред Бул (Б)", "Бёрн ", "Драйв (Зелёный) ", "Драйв (Жёлтый) ",
"Драйв (Красный) ", "Торнадо ", "Монстер (Блэк)", "Кола 0,33", "7ап 0,33", "Пепси 0,33", "Спрайт 0,33", "Миринда 0,33", "Липтон (лимон) 0,5",
"Липтон (Персик) 0,5 ", "Липтон (зелёный) 0,5", "Пепси (Классик) 0,5", "Пепси (Чери) 0,5", "Миринда (Классик) 0,5", "Спрайт 0,5", 
"Бон Аква (газ) ", "Аква Мин (газ) ", "Аква Мин (негаз)", "Торнадо ", "Монстер (Белый) ", "Читос ", "Лейс ", "Твикс.", "Бон Аква (негаз)",
"Круассаны (Ваниль)", "Круассаны (Какао) ", "Круассаны (Клубника) ", "Круассаны (Сгущонка)", "Маутин дью 0.33", "Ред Бул (М)", "HQD корица", 
"HQD яблоко", "HQD черника", "HQD жвачка", "HQD кола", "HQD фруктовый микс", "HQD манго", "HQD орехи", "HQD апельсин", "HQD ананас", "HQD клубника+банан",
"Монстер (манго)", "Пепси (манго) 0,33", "Адрик (синий)", "Барбекю (курица) ", "Барбекю (говядина) ", "Грибной (курица)", "Грибной (говядина)",
"Спайси (курица)", "Спайси (говядина)", "Чиз (курица)", "Пикантный (курица)", "Дорблю (курица) ", "Липтон 0,33", "Драйв ( Синий ) ", "Липтон (Земляника) ",
);


$ch = curl_init("http://5.228.174.10/api/reports/transactionslog?DateFrom=$last_transaction&DateTo=2022-1-1T00:00:00");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HEADER, false);
curl_setopt($ch, CURLOPT_USERPWD, "darkness_app:darkness2021");
$json = curl_exec($ch);
curl_close($ch);

$json=json_decode($json);

$transactions=$json->result->transactions;
$init=0;

if(count($transactions)>0){
   while($init<count($transactions)){
        if(($transactions[$init]->paymentMethodId == -1 or $transactions[$init]->paymentMethodId == -2) and $transactions[$init]->transactionDate !=null){
            $invoice_id=$transactions[$init]->invoiceId;
            $transaction_sum=$transactions[$init]->total;
            
            if($invoice_id != null){
                $ch_two = curl_init("http://5.228.174.10/api/reports/invoice/$invoice_id");
                curl_setopt($ch_two, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch_two, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt($ch_two, CURLOPT_HEADER, false);
                curl_setopt($ch_two, CURLOPT_USERPWD, "darkness_app:darkness2021");
                $json_two = curl_exec($ch_two);
                curl_close($ch_two);
    
                $json_two=json_decode($json_two);
                
                
                $sold_products=$json_two->result->soldProducts;
                
                $i=0;
                if(count($sold_products)>0){
                    while($i<count($sold_products)){
                        while ($exeption = current($exeption_list)) {
                            if ($exeption == $sold_products[$i]->productName) {
                                $price=$sold_products[$i]->unitPrice;
                                $transaction_sum=$transaction_sum-$price;
                            }
                            next($exeption_list);
                        }
                        $i++;
                    }
                }   
            }
            
            $percent=floor(($transaction_sum/100)*2.5);
            $jackpot_summa+=$percent;
        }
        $transaction_time=$transactions[$init]->transactionDate;
        $init++;
    } 
    
    $support_time=explode('.', $transaction_time);
    $support_time=$support_time[0].".999999";
    $sql="UPDATE `jackpot_data` SET `last_update`='$support_time',`summa`='$jackpot_summa' WHERE `id`='1'";
    mysqli_query($dbc, $sql);
    echo $jackpot_summa;
}else{
    echo $jackpot_summa=$row['summa'];
}




?>