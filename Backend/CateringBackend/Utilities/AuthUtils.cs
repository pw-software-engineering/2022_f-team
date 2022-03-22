using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CateringBackend.Utilities.Enums;
using Microsoft.IdentityModel.Tokens;
using static System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames;


namespace CateringBackend.Utilities
{
    public static class AuthUtils
    {
        public static string GetAuthenticationToken(Guid userID, string userEmail, Role userRole)
        {
            var claims = new List<Claim>()
            {
                new Claim("userID", userID.ToString()),
                new Claim("userEmail", userEmail),
                new Claim(ClaimTypes.Role, userRole.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Constants.JwtSigningKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                "issuer",
                "audience",
                claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
