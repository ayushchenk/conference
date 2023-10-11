interface ImportMetaEnv {
    VITE_USER_API_URL: string;
    VITE_CONFERENCE_API_URL: string;
    VITE_SUBMISSION_API_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}