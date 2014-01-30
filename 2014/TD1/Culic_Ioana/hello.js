//functia main verifica daca textul primit ca parametru contine "Hello Hello Hello"

function main(string)
{
var patt = new RegExp('(Hello Hello Hello){1,}');
var res = patt.test(string);
return res;
}
