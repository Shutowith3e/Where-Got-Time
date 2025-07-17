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
	- [/users/getUserClashes](#post-usersgetuserclashes)
- [/groups](#groups)
	- [/groups/acceptGroupInvite](#patch-groupsacceptgroupinvite)
	- [/groups/checkAdmin](#post-groupscheckadmin)
	- [/groups/createGroup](#post-groupscreategroup)
	- [/groups/groupAdmins](#post-groupsgroupadmins)
	- [/groups/groupDetails](#post-groupsgroupdetails)
	- [/groups/groupEvent](#post-groupsgroupevents)
	- [/groups/groupMembers](#post-groupsgroupmembers)
	- [/groups/leaveGroup](#delete-groupsleavegroup)
	- [/groups/searchEmails](#get-groupssearchemails)
	- [/groups/getPendingGroups](#post-groupsgetpendinggroups)
- [/events](#events)
	- [/events/getEventParticipants](#post-eventsgeteventparticipants)
- [/admins](#admins)
	- [/admins/createEvent](#post-adminscreateevent)
	- [/admins/deleteEvent](#delete-adminsdeleteevent)
	- [/admins/deleteGroup](#delete-adminsdeletegroup)
	- [/admins/deleteGroupMember](#delete-adminsdeletegroupmember)
	- [/admins/getHighPriorityEvents](#post-adminsgethighpriorityevents)
	- [/admins/inviteGroupMembers](#post-adminsinvitegroupmembers)
	- [/admins/makeAdmin](#put-adminsmakeadmin)
	- [/admins/removeAdmin](#put-adminsremoveadmin)
	- [/admins/updateGrpDesc](#patch-adminsupdategrpdesc)
	- [/admins/updateGrpName](#patch-adminsupdategrpname)


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
		"gid": "732dc2d9-2d6b-4506-9ccb-1590bbc05111",
		"group": {
			"gid": "732dc2d9-2d6b-4506-9ccb-1590bbc05111",
			"group_name": "Frd Grp B",
			"group_description": "For outings"
		},
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
| `rrule`              | null or string | Recurrence rule. Defines the recurrence for this event, **can be null**|
| `event_name`              | string | Name of the event |
| `start_datetime`              | string | string representing the start datetime of the event |
| `end_datetime`              | string  | string representing the end datetime of the event |
| `high_priority`              | boolean | boolean value representing the priority of the event. `true` for high, `false` for low |

<br>

**`group` object** 
| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `gid`              | string | ID of the group |
| `group_name`              | string | name of the group |
| `group_description`              | string | group's description |
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

### POST /users/getUserClashes

**Description**   
Returns the clashes of the user, separated into `member_clashes` and `admin_clashes` depending on if they are a member or admin of the group that the event belongs to. 

**Supported attributes:**  
None.  
Email will be retrieved directly from jwt.


**If successful, returns status code `200` and a json response in the following format:**

```json
{
  "data": {

    "member_clashes": [
      {
		"event_name1":"smth",
		"event_name2":"smthelse",
		"group_name1":"A",
		"group_name2":"B",
	  },
	  {
		"imagine theres another object here"
	  }

    ],

    "admin_arr": [
      {
		"event_name1":"smth2",
		"event_name2":"smthelse2",
		"group_name1":"A",
		"group_name2":"B",
		"affected_members":["member1email","m2@email.com"],
		"other_grp_admins":["email1","email2"]
	  },

	  {
		"im putting this here just to remind that its an array of objects"
	  }
    ]
  }
}
```
**Response body**  
| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `data`              | JSON Object | An object containing `member_clashes` and `admin_clashes` 
--- 
<br>

**`data` object** 
| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `member_arr`              | Array | An array of objects containing information about event clashes for members |
| `admin_arr`              | Array | An array of objects containing information about event clashes for admins |
<br>
---







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
		"end_datetime": "2025-06-20T10:50:10",
		"high_priority": true,
		"duration":2,
		"event_participants": [
			"joey.chik.2024@computing.smu.edu.sg",
			"jiale.lim.2024@computing.smu.edu.sg"
			]
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
| `duration`              | BigInt  | BigInt representing the duration of the event in seconds |
| `event_participants`              | array  | array of emails of event participants |
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

### DELETE /groups/leaveGroup

**Description**   
Removes the user (self) from the group

**Supported attributes:**  

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `gid`              | string | ID of the group |
| `personal_gid`              | string | ID of the user's personal group |

**If successful, returns status code `200` and a json response in the following format:**

```json
{
	"message":"You have left the group!"
}
```
note: does not return any data, only a message  
note2: You will get an error if you try to leave a group you are not part of or if you try to leave your personal group

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

---

### POST /groups/getPendingGroups

**Description**   
Returns an array containing all groups which the user has yet to accept invites for

**Supported attributes:**  
None.  
Email will be retrieved directly from jwt.


**If successful, returns status code `200` and a json response in the following format:**

```json
{
  "data": [
	{
		"gid": "gid1",
		"group_name": "grp_name1",
		"group_description": "grp_desc1"
	}, 

	{
		"gid": "gid2",
		"group_name": "grp_name2",
		"group_description": "grp_desc2"
	}, 
  ]
}
```
**Response body**  
| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `data`              | Array | An array of objects containing `gid`, `group_name`, and `group_description` 
--- 
<br>

**`data` object** 
| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `gid`              | String | The `gid` of the group the user has yet to accept. |
| `group_name`              | String | The `group_name` of the group the user has yet to accept. |
| `group_description`              | String | The `group_description` of the group the user has yet to accept. |
<br>
---

### PATCH /groups/rejectGroupInvite

**Description**   
Updates the `invite_accepted` attribute of the group_member table of the given user and group to `false`.

**Supported attributes:**  


| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `gid`              | string | ID of the group |

User's email is taken from jwt

**If successful, returns status code `200` and a json response in the following format:**

```json
{
	"message": "Group invite rejected!"
}
```
*note: no data is returned, just a status code and message
<br>

---


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
| `email_arr`              | array of strings | Array of emails of event participants |



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

### POST /admins/getHighPriorityEvents

**Description**   
Gets the high priority events that members of the group is a participant of. 

**Supported attributes:**  

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `gid`              | string | ID of the group  |



**If successful, returns status code `200` and a json response in the following format:**

```json
{
	"data":[
  {
    "eid": "23e4e4ba-3a0a-458a-992a-cbcaf571a991",
    "gid": "62af6a4a-e77c-4124-8c13-93c08644e49a",
	"group_name": "group_name",
    "rrule": null,
    "duration": "7 days",
    "event_name": "idw attend",
    "end_datetime": "2025-06-30T18:24:10",
    "high_priority": true,
    "start_datetime": "2025-06-23T18:24:03",
    "event_participants": [ 
		"joey.chik.2024@computing.smu.edu.sg"
	]
  },
  {
    "eid": "68f9d513-9d12-4f9d-9b95-acc799d6f103",
    "gid": "21924b54-03cd-40bb-92b6-fac4a0d68e6f",
	"group_name": "group_name",
    "rrule": null,
    "duration": "1 day 00:00:02",
    "event_name": "simi event bro",
    "end_datetime": "2025-06-21T10:50:10",
    "high_priority": true,
    "start_datetime": "2025-06-20T10:50:08",
    "event_participants": [
      "jiale.lim.2024@computing.smu.edu.sg",
      "clarice.lim.2024@computing.smu.edu.sg"
    ]
  }
] 
}
```

note: `rrule` can be a string or empty string ('') or null (because of testing data )
empty string and null are treated as false

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

### PATCH /admins/updateGrpDetail

**Description**   
Updates the group description

**Supported attributes:**  

| Attribute                | Type     | Description           |
|--------------------------|----------|-----------------------|
| `gid`              | string | ID of the group |
| `new_desc`            | string | the new description, can be empty |
| `new_name`            | string | the new name, cannot be empty |



**If successful, returns status code `200` and a json response in the following format:**

```json
{
	"message": "Successfully updated group detail!" 
}
```
note: no data is being returned, just a message

<br>

---

