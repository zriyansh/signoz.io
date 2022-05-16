---
id: authentication
title: Authentication and Login
sidebar_label: Authentication
---

Authentication is available in SigNoz from `v0.8.0` If you are on an earlier version, please upgrade to see this.

## Roles
SigNoz currently supports 3 roles:
- Admin
- Editor
- Viewer

The person who installs SigNoz and registers for the first time is by default assigned the role of an admin.

- If you are logging in SigNoz for the first time, just create an account. This will make you an admin.
- If you would like to invite more members, they would need an invite link from admin. You can create invite link from `Settings-> Org Settings` tab

Admins can add new users by creating invites for them and sending them invite link to create an account.

![user-invite](../../static/img/docs/user-invite.png)


:::note

As of `version 0.8.0`, news users can only be invited by Admins to a SigNoz instance. New users will get an invite link from admin which they can use to signup to SigNoz.

When new user is invited by an admin, he can be assigned a role of Admin, Editor or Viewer 

:::

## Editing Member Details

You can edit permission levels of members by going to `Settings-> Org Settings` tab and then Members table. 
You can also generate password reset link if they have forgotten their password and it needs to be reset.

![edit-member](../../static/img/docs/edit-member.png)


## Permission Matrix

|  | Admin | Editor | Viewer |
| --- | --- | --- | --- |
| View application list | Y | Y | Y |
| Search/Filter application list | Y | Y | Y |
| View metrics detail page | Y | Y | Y |
| View Dashboards | Y | Y | Y |
| Create new Dashboards | Y | Y | N |
| Import Dashboard | Y | Y | N |
| Export Dashboard | Y | Y | Y |
| View Tracefilter page & do filtering | Y | Y | Y |
| View Trace Detail page | Y | Y | Y |
| View Alerts | Y | Y | Y |
| Search/Filter Alerts | Y | Y | Y |
| Add new alerts | Y | Y | N |
| View Settings page | Y | N | N |
| View Service Map | Y | Y | Y |
| Invite New Members | Y | N | N |
| Revoke Invite of members | Y | N | N |
| Create New Alert Channels | Y | N | N |
| Set Retention period | Y | N | N |
| Set own password and name | Y | Y | Y |
| Change Org Name | Y | N | N |
| Edit/Delete member details | Y | N | N |
| View version information  page(from left panel) | Y | Y  | Y |
| Change theme (dark/light) | Y | Y | Y |