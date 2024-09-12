# Task Mangemnet

Task mangement web app with nestjs

## Schema:

**User**:

| Name                 | Type    |
| -------------------- | ------- |
| Name                 | String  |
| Email                | String  |
| Photo                | String  |
| Role                 | String  |
| Password             | String  |
| PasswordChangedAt    | Date    |
| PasswordResetToken   | String  |
| PasswordResetExpires | Date    |
| Active               | Boolean |

**Task**:

| Name            | Type      |
| --------------- | --------- |
| Name            | String    |
| Description     | Text      |
| Status          | String    |
| Steps           | String [] |
| Priority        | String    |
| Author          | User      |
| AssignTo        | User []   |
| StartDate       | Date      |
| EndDate         | Date      |
| ExpectedEndDate | Date      |
| IsOverdue       | Boolean   |
