import { app } from "./app";
import { connectDB } from "@shared/database/prisma"
import 'dotenv/config';


const PORT = process.env.PORT || 3003;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`🚀 Server started on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
