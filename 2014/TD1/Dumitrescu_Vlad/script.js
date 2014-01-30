<script>
function myFunction()   //testeaza functia testFunction(str)
{
var str = "Hello Hello Hello";

document.getElementById("demo").innerHTML=testFunction(str);
}

function testFunction(str)   //functia verifica daca stringul primit ca parametru contine stringul "Hello Hello Hello"
{var patt1 = /Hello Hello Hello/; 
return patt1.test(str);

}
</script>
