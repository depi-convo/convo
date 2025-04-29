# API Documentation

This document describes all REST API routes and Socket.IO events for the backend chat application.

---

## Authentication Routes (`/api/auth`)

### POST `/signup`
- **Description:** Register a new user.
- **Body:** `{ fullName, email, password }`
- **Response:** `201 Created` with user info and JWT cookie.

### POST `/login`
- **Description:** Log in an existing user.
- **Body:** `{ email, password }`
- **Response:** `200 OK` with user info and JWT cookie.

### POST `/logout`
- **Description:** Log out the current user.
- **Response:** `200 OK`

### PUT `/update-profile`
- **Description:** Update user profile info.
- **Body:** `{ fullName?, phoneNumber?, profilePic? }`
- **Auth:** JWT required
- **Response:** `200 OK` with updated user info.

### GET `/check`
- **Description:** Check if the user is authenticated.
- **Auth:** JWT required
- **Response:** `200 OK` with user info.

---

## User Social Actions (`/api/auth`)

### POST `/add-friend`
- **Description:** Add a user to your friends list.
- **Body:** `{ friendId }`
- **Auth:** JWT required
- **Response:** `200 OK` on success.

### POST `/remove-friend`
- **Description:** Remove a user from your friends list.
- **Body:** `{ friendId }`
- **Auth:** JWT required
- **Response:** `200 OK` on success.

### POST `/block-user`
- **Description:** Block a user.
- **Body:** `{ blockId }`
- **Auth:** JWT required
- **Response:** `200 OK` on success.

### POST `/unblock-user`
- **Description:** Unblock a user.
- **Body:** `{ blockId }`
- **Auth:** JWT required
- **Response:** `200 OK` on success.

### GET `/friends`
- **Description:** Get your friends list.
- **Auth:** JWT required
- **Response:** `{ friends: [user, ...] }`

### GET `/blocked`
- **Description:** Get your blocked users list.
- **Auth:** JWT required
- **Response:** `{ blocked: [user, ...] }`

---

## Message Routes (`/api/messages`)

### POST `/send`
- **Description:** Send a direct message.
- **Body:** `{ receiver, content }`
- **Auth:** JWT required
- **Response:** `201 Created` with message info.

### GET `/conversation/:otherUserId`
- **Description:** Get all messages between you and another user.
- **Auth:** JWT required
- **Response:** `{ messages: [...] }`

### GET `/inbox`
- **Description:** Get latest message from each conversation.
- **Auth:** JWT required
- **Response:** `{ inbox: [...] }`

### DELETE `/:messageId`
- **Description:** Delete a message you sent.
- **Auth:** JWT required
- **Response:** `200 OK` on success.

---

## Group Chat Routes (`/api/groups`)

### POST `/`
- **Description:** Create a new group.
- **Body:** `{ name, members, description?, avatar? }`
- **Auth:** JWT required
- **Response:** `201 Created` with group info.

### POST `/:groupId/add-member`
- **Description:** Add a member to a group (admin only).
- **Body:** `{ userId }`
- **Auth:** JWT required
- **Response:** `200 OK` on success.

### POST `/:groupId/remove-member`
- **Description:** Remove a member from a group (admin only).
- **Body:** `{ userId }`
- **Auth:** JWT required
- **Response:** `200 OK` on success.

### GET `/:groupId`
- **Description:** Get group info.
- **Auth:** JWT required
- **Response:** `{ group: {...} }`

### GET `/:groupId/messages`
- **Description:** Get all messages in a group.
- **Auth:** JWT required
- **Response:** `{ messages: [...] }`

### POST `/:groupId/messages`
- **Description:** Send a message to a group.
- **Body:** `{ content }`
- **Auth:** JWT required
- **Response:** `201 Created` with message info.

---

## Socket.IO Events

### Connection
- **Auth:** Must provide JWT token in `auth.token` during connection handshake.

### `join`
- **Description:** Join your own room for direct messages.
- **Payload:** none

### `join-group`
- **Description:** Join a group chat room.
- **Payload:** `groupId`

### `send-message`
- **Description:** Send a direct message in real-time.
- **Payload:** `{ sender, receiver, content }`
- **Callback:** `{ success, message }` or `{ error }`
- **Receive Event:** `receive-message` with message object

### `send-group-message`
- **Description:** Send a message to a group in real-time.
- **Payload:** `{ sender, groupId, content }`
- **Callback:** `{ success, message }` or `{ error }`
- **Receive Event:** `receive-group-message` with message object

---

## Error Handling
- All endpoints return `400`, `401`, `403`, `404`, or `500` with a JSON `{ message: ... }` on error.
- Socket.IO events use callback with `{ error }` on failure.

---

## Notes
- All protected routes require a valid JWT token (sent as cookie or Authorization header).
- All message and group actions enforce blocking logic and sender verification.
- For more advanced features (rate limiting, validation, admin transfer, etc.), see codebase or contact maintainers.
