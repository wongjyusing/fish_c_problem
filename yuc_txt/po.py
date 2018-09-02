import base64
import re
def decode_base64(data):
    missing_padding = 4 - len(data) % 4
    if missing_padding:
        data += b'='* missing_padding
    return base64.decodestring(data)
def main():
    a = b'NzBUJTY0USUxNkYlNTVLJTUwRCU1OEglMzBQJTIwTyU1M1olNTFHJTI2RCU3MkQlMjdTJTQ1WiUxM0UlMlklMzdaJTE1TiUyME4lMEIlN0IlNTREJTU4SSU2N0YlNTZVJTQ5QiU3MUElMUQlMjRNJTUxUSU2MlklMTNEJTY0TyUxMkclNDFPJTlYJTM3UyU0OVUlMTVQJTM1QyUyNUslM1YlMzNCJTc1UCUyOVElNEIlNzJaJTM4QiUzM00lNDhCJTQ0SSU3MVklNDZNJTY4UiU3M0ElMjNVJTQwQiU0NU4lMjBUJTI5VyU2N1MlMzZKJTY1VCU1NFMlMjhaJTE2VyU2MlklMTJDJTc4UyUyMlAlMTNCJTQ3RSU0MlUlNDk'
    dd = str(decode_base64(a))
    req = re.findall(r"\d+\.?\d*",dd)
    print(req)
if __name__ == '__main__':
    main()
