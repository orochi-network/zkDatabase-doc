---
sidebar_position: 2
---

# Group

In **zkDatabase**, ownership and group management play a crucial role in managing access control for documents and collections. The system allows users to create groups, assign group memberships, and share permissions across the group, while also managing the ownership structure for collections and documents.

### Group Creation and Management

- **Creating a Group**: Any user in **zkDatabase** can create a group. When a user creates a group, they automatically become the **owner** of the group.
- **Adding Users to a Group**: The group owner has the authority to add or remove users from the group. When a user is added to a group, they inherit the group's permissions to associated documents and collections.
- **Sharing Permissions**: All users in the same group will share the same permissions (e.g., read, write, delete) for collections and documents that are associated with that group.

### **Ownership and Permission Model for Documents and Collections**

The ownership system in **zkDatabase** includes three primary categories for access control:

- **Owner**: Full access to modify, delete, and manage documents and collections.
- **Group**: Shared access for all users in the group, with the same permissions (e.g., read, write, delete).
- **Other**: Limited access for users not in the "owner" or "group" categories.

Each document or collection has an owner, and the owner can assign specific permissions to their group or others. This allows fine-grained control over who can interact with the database items.
