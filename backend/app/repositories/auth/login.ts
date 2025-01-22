import db from "../../connection";

interface UserWithPassword {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export const findUserByEmail = async (
  email: string
): Promise<UserWithPassword | null> => {
  try {
    const result = await db.query(
      `SELECT id, email, password, first_name, last_name 
       FROM users 
       WHERE email = $1`,
      [email]
    );
    return result.rows[0] || null;
  } catch (error) {
    throw error;
  }
};
