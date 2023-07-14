
function number(rows, column)
{
    for(i = 1; i <= rows; i++){
        let hasil = "";
        for(j = 1; j <= column; j++)
        {
            hasil += i * j + " ";
        }
        console.log(hasil)
    }
}

number(5,5);