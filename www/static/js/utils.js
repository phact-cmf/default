function getNumEnding(num, str1, str2, str3)
{
    str1  = str1 || 'штуку';
    str2  = str2 || 'штуки';
    str3  = str3 || 'штук';

    if (num == 0) {
        return str3;
    }

    num = num || 1;

    var value = num % 100;

    if (value == 0) {
        return str3;
    }

    if (value > 10 && value < 20)
        return str3;
    else
    {
        value = num % 10;
        if (value == 1)
            return str1;
        else if (value > 1 && value < 5)
            return str2;
        else
            return str3;
    }
}