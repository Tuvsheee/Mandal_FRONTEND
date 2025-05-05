import createNextPlugin from "next-intl/plugin";

const withNextIntl = createNextPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl(nextConfig);
