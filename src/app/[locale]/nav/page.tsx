import { Link } from "@/i18n/routing";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProvider } from "@/lib/info";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { speedTestsTable } from "@/db/schema";

interface Provider {
  baseUrl: string;
}

export default async function NavPage() {
  
  // Fetch providers directly on the server
  let providers: Provider[] = [];
  let error = null;
  const getHostFromBaseUrl = (baseUrl: string) => {
    return baseUrl.includes("http") ? new URL(baseUrl).host : baseUrl;
  };

  try {
    // Get all unique baseUrls from the speedTestsTable
    const result = await db
      .select({
        baseUrl: speedTestsTable.baseUrl,
      })
      .from(speedTestsTable)
      .groupBy(speedTestsTable.baseUrl)
      .orderBy(speedTestsTable.baseUrl);
    
    // Extract hosts from baseUrls and merge providers with the same host
    const hostMap = new Map<string, string>();
    
    result.forEach(provider => {
      const host = getHostFromBaseUrl(provider.baseUrl);
      // Keep the first baseUrl for each host
      if (!hostMap.has(host)) {
        hostMap.set(host, provider.baseUrl);
      }
    });
    
    // Convert the map back to an array of providers
    providers = Array.from(hostMap.entries()).map(([, baseUrl]) => ({
      baseUrl
    }));
  } catch (err) {
    console.error("Error fetching providers:", err);
    error = err;
  }
  


  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">LM Speed 提供商导航</h1>
      <p className="mb-8 text-gray-600">
        以下是所有在 LM Speed 测试中使用的 API 提供商列表
      </p>

      {providers.length === 0 && !error && (
        <div className="flex justify-center">
          <div className="bg-white shadow overflow-hidden rounded-lg p-4 text-center text-gray-500">
            加载中...
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((provider, index) => {
          const host = getHostFromBaseUrl(provider.baseUrl);
          const providerInfo = getProvider(host);

          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle>{providerInfo?.name || host}</CardTitle>
                <CardDescription>
                  {providerInfo?.url ? (
                    <a
                      href={providerInfo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {providerInfo.url}
                    </a>
                  ) : (
                    host
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href={`/provider/${host}`}>查看测试结果 </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
