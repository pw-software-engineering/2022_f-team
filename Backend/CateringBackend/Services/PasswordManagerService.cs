using System;
using System.IO;
using System.Security.Cryptography;
using Microsoft.Extensions.Options;

namespace CateringBackend.Services
{
    public interface IPasswordManagerService
    {
        string Encrypt(string plainText);
        string Decrypt(string cipherText);
    }

    public class PasswordManagerService : IPasswordManagerService
    {
        private readonly string _secretKey = "batSsxJg8NsNZykrgJVY7PjjMEtUYYqF";
        private readonly string _IV = "8Jkq94mnUlf/Pw7kFqeit5==";

        public PasswordManagerService()
        {
        }

        public string Encrypt(string plainText)
        {
            byte[] encrypted;

            using (Aes aes = Aes.Create())
            {
                aes.Key = Convert.FromBase64String(_secretKey);
                aes.IV = Convert.FromBase64String(_IV);

                ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                using MemoryStream msEncrypt = new();
                using CryptoStream csEncrypt = new(msEncrypt, encryptor, CryptoStreamMode.Write);
                using (StreamWriter swEncrypt = new(csEncrypt))
                {
                    swEncrypt.Write(plainText);
                }
                encrypted = msEncrypt.ToArray();
            }
            return Convert.ToBase64String(encrypted);
        }

        public string Decrypt(string cipherText)
        {
            string plaintext = null;

            using (Aes aes = Aes.Create())
            {
                aes.Key = Convert.FromBase64String(_secretKey);
                aes.IV = Convert.FromBase64String(_IV);

                ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

                using MemoryStream msDecrypt = new(Convert.FromBase64String(cipherText));
                using CryptoStream csDecrypt = new(msDecrypt, decryptor, CryptoStreamMode.Read);
                using StreamReader srDecrypt = new(csDecrypt);
                plaintext = srDecrypt.ReadToEnd();
            }
            return plaintext;
        }
    }
}
