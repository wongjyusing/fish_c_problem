var book = 'NzBUJTY0USUxNkYlNTVLJTUwRCU1OEglMzBQJTIwTyU1M1olNTFHJTI2RCU3MkQlMjdTJTQ1WiUxM0UlMlklMzdaJTE1TiUyME4lMEIlN0IlNTREJTU4SSU2N0YlNTZVJTQ5QiU3MUElMUQlMjRNJTUxUSU2MlklMTNEJTY0TyUxMkclNDFPJTlYJTM3UyU0OVUlMTVQJTM1QyUyNUslM1YlMzNCJTc1UCUyOVElNEIlNzJaJTM4QiUzM00lNDhCJTQ0SSU3MVklNDZNJTY4UiU3M0ElMjNVJTQwQiU0NU4lMjBUJTI5VyU2N1MlMzZKJTY1VCU1NFMlMjhaJTE2VyU2MlklMTJDJTc4UyUyMlAlMTNCJTQ3RSU0MlUlNDk=';
var a = Buffer.from(book, 'base64').toString('utf-8').split(/[A-Z]+%/);
console.log(a);
/*
var j = 0;
for (var i = 0; i < a.length; i++) {
    if (a[i] < 5) {
        console.log(i);
        j++
    } else {
        console.log(i)
    }
};
*/
