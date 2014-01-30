Varianta 1:
<!DOCTYPE html>
<html>
<body>
<script>
var str = "Hello Hello Hello world!";
var patt1 = /(Hello )+/g;
var result = str.match(patt1);
document.write(result);
</script>
</body>
</html>

Varianta 2 :
<!DOCTYPE html>
<html>
<body>
<script>
var str = "Hello Hello Hello world!";
var patt1 = /^Hello Hello Hello/g;
var result = str.match(patt1);
document.write(result);
</script>
</body>
</html>
