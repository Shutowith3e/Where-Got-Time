# WGT Backend API Documentation
Reference and guides to all backend endpoints for WhereGotTime can be found here.  
All endpoints require a valid supabase jwt to access  
The title for each endpoint is in the format METHOD /endpoint

Required attributes are to be passed in through req.body, except for GET requests

---
# Contents
- [/users](#users)
    - [/users/getGroups](#post-usersgetgroups)
    - [/users/getUserEvents](#post-usersgetuserevents)
	- [/users/getUserPersonalGroup](#post-usersgetuserpersonalgroup)
- [/groups](#groups)
	- [/groups/acceptGroupInvite](#patch-groupsacceptgroupinvite)
	- [/groups/checkAdmin](#post-groupscheckadmin)
	- [/groups/createGroup](#post-groupscreategroup)
	- [/groups/groupAdmins](#post-groupsgroupadmins)
	- [/groups/groupDetails](#post-groupsgroupdetails)
	- [/groups/groupEvent](#post-groupsgroupevents)
	- [/groups/groupMembers](#post-groupsgroupmembers)
	- [/groups/searchEmails](#get-groupssearchemails)
- [/events](#events)
	- [/events/getEventParticipants](#post-eventsgeteventparticipants)
- [/admins](#admins)
	- [/admins/createEvent](#post-adminscreateevent)
	- [/admins/deleteEvent](#delete-adminsdeleteevent)
	- [/admins/deleteGroup](#delete-adminsdeletegroup)
	- [/admins/deleteGroupMember](#delete-adminsdeletegroupmember)
	- [/admins/inviteGroupMembers](#post-adminsinvitegroupmembers)
	- [/admins/makeAdmin](#put-adminsmakeadmin)
	- [/admins/removeAdmin](#put-adminsremoveadmin)


---

## /users

### POST /users/getGroups

**Description**   
Returns the groups of the user, separated into `member_arr` and `admin_arr` depending on if they are a member or admin of each group. 

**Supported attributes:**  
None.  
Email will be retrieved directly from jwt.


**If successful, returns status code `200` and a json response in the following format:**

```json
{
  "data": {

    "member_arr": [
      "gid1",
      "gid2"
    ],

    "admin_arr": [
      "gid3",
	  "gid4"
    ]
  }
}
```
**Response body**  
| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `data`              | JSON Object | An object containing `member_arr` and `admin_arr` 
--- 
<br>

**`data` object** 
| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `member_arr`              | Array | An array containing the `gid` of all groups the user is a (non-admin) member of. |
| `admin_arr`              | Array | An array containing the `gid` of all groups the user is an of. |
<br>
---
### POST /users/getUserEvents

**Description**   
Returns the events of the user. 

**Supported attributes:**  
None.  
Email will be retrieved directly from jwt.


**If successful, returns status code `200` and a json response in the following format:**

```json
{
	"data": [
		{
		"eid": "68f9d513-9d12-4f9d-9b95-acc799d6f103",
		"gid": "21924b54-03cd-40bb-92b6-fac4a0d68e6f",
		"group": [Object],
		"rrule": null,
		"event_name": "simi event bro",
		"start_datetime": "2025-06-20T10:50:08",
		"end_datetime": "2025-06-21T10:50:10",
		"high_priority": true
		}
	],
}
```
**Response body**

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `data`              | Array | An array of `event` objects |
---
<br>

**`event` object** 
| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `eid`              | string | ID of the event |
| `gid`              | string | ID of the group that the event belongs to |
| `group`              | JSON Object | Contains information about the group |
| `rrule`              | string | Recurrence rule. Defines the recurrence for this event, **can be null**|
| `event_name`              | string | Name of the event |
| `start_datetime`              | string | string representing the start datetime of the event |
| `end_datetime`              | string  | string representing the end datetime of the event |
| `high_priority`              | boolean | boolean value representing the priority of the event. `true` for high, `false` for low |


---
<br>

### POST /users/getUserPersonalGroup

**Description**   
Returns gid of the user's personal group.

**Supported attributes:**  
None.  
Email will be retrieved directly from jwt.



**If successful, returns status code `200` and a json response in the following format:**

```json
{
	"data": "6faf04ff-4978-43d4-8559-59fac7a4c333",
}
```
**Response body**

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `data`              | string | The `gid` of the user's personal group |
---
<br>









## /groups

### PATCH /groups/acceptGroupInvite

**Description**   
Updates the `invite_accepted` attribute of the group_member table of the given user and group to `true`.

**Supported attributes:**  


| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `gid`              | string | ID of the group |

User's email is taken from jwt

**If successful, returns status code `200` and a json response in the following format:**

```json
{
	"message": "You have joined the group!"
}
```
*note: no data is returned, just a status code and message
<br>

---
### POST /groups/checkAdmin

**Description**   
Returns true if user is an admin of a given group, false otherwise. 

**Supported attributes:**  

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `gid`              | string | ID of the group |

*note: Email will be retrieved directly from jwt.


**If successful, returns status code `200` and a json response in the following format:**

```json
{
	"isAdmin": true
}
```
**Response body**

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `isAdmin`              | Boolean | Is the user an Admin of the group |
<br>
---

### POST /groups/createGroup

**Description**   
Creates a group, makes the creator an admin, and sends out invites. 

**Supported attributes:**  


| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `group_name`              | string | name of group |
| `group_description`              | string | description of group |
| `emails to invite`              | string array | An array of emails to be invited |

*note: Creator's email will be retrieved directly from jwt.

**If successful, returns status code `201` and a json response in the following format:**

```json
{
	"message":"Group: example_grp_name created successfully!",
	 "gid": "insert example gid"
}
```
**Response body**

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `message`              | string | message confirming success and including group name |
| `gid`              | string | The newly created group's `gid` |

<br>

---

### POST /groups/groupAdmins

**Description**   
Returns the emails of the admins of the group. 

**Supported attributes:**  

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `gid`              | string | ID of the group |
---


**If successful, returns status code `200` and a json response in the following format:**

```json
{
	"data": [
		"email1@email.com",
		"email2@email.com",
		"email3@email.com"
	],
}
```
**Response body**

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `data`              | Array | An array of `email`s |

<br>

---

### POST /groups/groupDetails

**Description**   
Returns the name and description of the group. 

**Supported attributes:**  

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `gid`              | string | ID of the group |



**If successful, returns status code `200` and a json response in the following format:**

```json
{
	"data": {
    	"group_name": "group1",
    	"group_description": "Desc1"
    }
}
```
**Response body**

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `data`              | JSON object | A object containing `group_name` and `group_description` |
---
<br>

**`data` object** 


| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `group_name`              | string | name of the group |
| `group_description`              | string | description of the group |

<br>

---

### POST /groups/groupEvents

**Description**   
Returns the events of the group. 

**Supported attributes:**  

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `gid`              | string | ID of the group |



**If successful, returns status code `200` and a json response in the following format:**

```json
{
	"data": [
		{
		"eid": "68f9d513-9d12-4f9d-9b95-acc799d6f103",
		"gid": "21924b54-03cd-40bb-92b6-fac4a0d68e6f",
		"rrule": null,
		"event_name": "simi event bro",
		"start_datetime": "2025-06-20T10:50:08",
		"end_datetime": "2025-06-21T10:50:10",
		"high_priority": true
		},
		
		{
			"pretend theres another event object here"
		}
	]
}
```
**Response body**

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `data`              | Array | An array of `event` objects |
---
<br>

**`event` object** 
| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `eid`              | string | ID of the event |
| `gid`              | string | ID of the group that the event belongs to |
| `rrule`              | string | Recurrence rule. Defines the recurrence for this event, **can be null**|
| `event_name`              | string | Name of the event |
| `start_datetime`              | string | string representing the start datetime of the event |
| `end_datetime`              | string  | string representing the end datetime of the event |
| `high_priority`              | boolean | boolean value representing the priority of the event. `true` for high, `false` for low |


<br>

---

### POST /groups/groupMembers

**Description**   
Returns an array containing all group members' emails, including admins 

**Supported attributes:**  

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `gid`              | string | ID of the group |


**If successful, returns status code `200` and a json response in the following format:**

```json
{
	"data": [
		"hello@email.com",
		"hello@smu.edu.sg"
	],
}
```
**Response body**

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `data`              | Array | An array of `email`s |
---
<br>


---

### GET /groups/searchEmails

**Description**   
Returns an array containing emails that contain the search term, limited to 10

**Supported attributes:**  

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `searchTerm`              | string | The term used to search for emails |

note: User's own email is taken from jwt   
note2: unlike in POST,PUT,PATCH,DELETE where the attributes are sent in via `req.body`, in GET it is sent via URL  
e.g : GET http://localhost:8000/group/searchEmails?searchTerm=blahblahblah  

**If successful, returns status code `200` and a json array response in the following format:**

```json

[
	"hello@email.com",
	"hello@smu.edu.sg"
]

```
**Response body**

Literally js an array

---
<br>



## /events

### POST /events/getEventParticipants

**Description**   
Returns an array of emails of users participating in the event. 

**Supported attributes:**  

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `eid`              | string | ID of the event |



**If successful, returns status code `200` and a json response in the following format:**

```json
{
	"data": [
		"email1@help.com",
		"email2@whydoidothis.com"
	],
}
```
**Response body**

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `data`              | Array | An array of `email`s |

<br>


---

## /admins
All endpoints in here require you to be an admin of the group to access.

You **must** include `gid` in req body to verify admin access, regardless of whether the endpoint requires it or not.

---

### POST /admins/createEvent

**Description**   
Creates an event for the group. 

**Supported attributes:**  

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `gid`              | string | ID of the group that the event belongs to |
| `rrule`              | string | Recurrence rule. Defines the recurrence for this event, **can be null**|
| `event_name`              | string | Name of the event |
| `start_datetime`              | string | string representing the start datetime of the event |
| `end_datetime`              | string  | string representing the end datetime of the event |
| `high_priority`              | boolean | boolean value representing the priority of the event. `true` for high, `false` for low |




**If successful, returns status code `201` and a json response in the following format:**

```json
{
	"message": "Event successfully created" 
}
```
note: no data is being returned, just a message

<br>

---

### DELETE /admins/deleteEvent

**Description**   
Deletes an event. 

**Supported attributes:**  

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `eid`              | string | ID of the event |




**If successful, returns status code `200` and a json response in the following format:**

```json
{
	"message": "Event deleted successfully!" 
}
```
note: no data is being returned, just a message

<br>

---

### DELETE /admins/deleteGroup

**Description**   
Deletes the group 

**Supported attributes:**  

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `gid`              | string | ID of the group |



**If successful, returns status code `200` and a json response in the following format:**

```json
{
	"message": "Event deleted successfully!" 
}
```
note: no data is being returned, just a message

<br>

---

### DELETE /admins/deleteGroupMember

**Description**   
Removes a member from the group. 

**Supported attributes:**  

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `gid`              | string | ID of the group  |
| `email`            | string | email of the user to be removed |



**If successful, returns status code `200` and a json response in the following format:**

```json
{
	"message": "Member deleted successfully!" 
}
```
note: no data is being returned, just a message

<br>

---

### POST /admins/inviteGroupMembers

**Description**   
Invites a member to the group. **DOES NOT** automatically add them in

**Supported attributes:**  

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `email_arr`            | string | array of emails of users to be added |
| `gid`              | string | ID of the group |



**If successful, returns status code `200` and a json response in the following format:**

```json
{
	"message": "Invites sent out to members successfully!"
}
```
note: no data is being returned, just a message

<br>

---

### PUT /admins/makeAdmin

**Description**   
Makes a non-admin member an admin. 

**Supported attributes:**  

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `email`            | string | email of the user to be made admin |
| `gid`              | string | ID of the group |



**If successful, returns status code `200` and a json response in the following format:**

```json
{
	"message": "Permissions for user has been changed" 
}
```
note: no data is being returned, just a message

<br>

---

### PUT /admins/removeAdmin

**Description**   
Removes admin permissions from an admin. 

**Supported attributes:**  

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `email`            | string | email of the admin to be demoted |
| `gid`              | string | ID of the group |



**If successful, returns status code `200` and a json response in the following format:**

```json
{
	"message": "Permissions for user has been removed" 
}
```
note: no data is being returned, just a message

<br>

---










