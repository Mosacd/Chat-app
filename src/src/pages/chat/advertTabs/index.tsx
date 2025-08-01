import { useState, useEffect, useRef } from 'react';

interface Ad {
    uid: string;
    imageUrl: string;
    isActive: boolean;
}

interface Media {
    name: string;
    url: string;
    uid: string;
    isPlaceholder?: boolean;
}

interface AdvertTabProps {
    side: 'left' | 'right';
}

const AdvertTab = ({ side }: AdvertTabProps) => {
    const [mediaList, setMediaList] = useState<Media[]>([]);
    const [currentMedia, setCurrentMedia] = useState<Media | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const videoRef = useRef<HTMLVideoElement>(null);

    // Load media list from API
    const loadMediaList = async () => {
        try {
            console.log("Loading ads from API...");
            const response = await fetch('https://chat.kiuvinme.ge/media/GetAllAds');
            
            console.log('API Response status:', response.status);
            console.log('API Response ok:', response.ok);

            if (response.ok) {
                const ads: Ad[] = await response.json();
                console.log('Raw API response:', ads);

                const dbVideos = ads
                    .filter(ad => ad.isActive && ad.imageUrl)
                    .map(ad => ({
                        name: ad.imageUrl.split('/').pop() || `video_${ad.uid}`,
                        url: `https://chat.kiuvinme.ge/${ad.imageUrl}`,
                        uid: ad.uid
                    }));

                    console.log(dbVideos)
                if (dbVideos.length > 0) {
                    setMediaList(dbVideos);
                    console.log('Loaded media from database:', dbVideos);
                    setError(null);
                } else {
                    console.warn('No active ads found in database');
                    loadFallbackMedia();
                }
            } else {
                console.error(`API request failed with status: ${response.status}`);
                loadFallbackMedia();
            }
        } catch (error) {
            console.error('Error loading media from API:', error);
            setError(error instanceof Error ? error.message : 'Unknown error');
            loadFallbackMedia();
        } finally {
            setIsLoading(false);
        }
    };

    const loadFallbackMedia = () => {
        setMediaList([
            {
                name: 'placeholder1',
                url: 'data:video/mp4;base64,',
                uid: 'placeholder',
                isPlaceholder: true
            }
        ]);
        console.log('Using fallback media');
    };

    const getRandomMedia = (exclude: Media | null = null): Media | null => {
        if (mediaList.length === 0) return null;

        let availableMedia = mediaList;
        if (exclude && mediaList.length > 1) {
            availableMedia = mediaList.filter(media =>
                media.name !== exclude.name && media.uid !== exclude.uid
            );
        }

        return availableMedia[Math.floor(Math.random() * availableMedia.length)];
    };

    const loadContent = () => {
        const media = getRandomMedia(currentMedia);
        if (media) {
            setCurrentMedia(media);
        }
    };

    // Initialize content on component mount
    useEffect(() => {
        const initializeContent = async () => {
            try {
                await loadMediaList();
            } catch (error) {
                console.error('Content initialization error:', error);
            }
        };

        initializeContent();
    }, []);

    // Load initial content when mediaList is available
    useEffect(() => {
        if (mediaList.length > 0) {
            loadContent();
        }
    }, [mediaList]);

    const handleVideoEnd = () => {
        console.log(`Video on ${side} side ended, loading new content`);
        setTimeout(() => {
            loadContent();
        }, 500);
    };

    const handleVideoError = (media: Media) => {
        console.error(`Video on ${side} side error, URL: ${media.url}`);
        setTimeout(() => {
            loadContent();
        }, 3000);
    };

    const handleVideoCanPlay = () => {
        console.log(`Video on ${side} side can play`);
        const video = videoRef.current;
        if (video) {
            video.play().catch(err => {
                console.warn(`Autoplay failed for video on ${side} side:`, err);
                setTimeout(() => video.play().catch(() => {}), 1000);
            });
        }
    };

    const VideoPlayer = ({ media }: { media: Media | null }) => {
        if (!media) {
            return (
                <div className="w-full h-[400px] bg-[#3B4252] rounded-lg flex items-center justify-center">
                    <div className="text-center text-[#D8DEE9]">
                        <div className="text-4xl mb-4">📹</div>
                        <div className="text-lg">Content Loading...</div>
                        {error && <div className="text-sm text-red-400 mt-2">API Connection Failed</div>}
                    </div>
                </div>
            );
        }

        if (media.isPlaceholder) {
            return (
                <div className="w-full h-[400px] bg-[#3B4252] rounded-lg flex items-center justify-center">
                    <div className="text-center text-[#D8DEE9]">
                        <div className="text-4xl mb-4">📹</div>
                        <div className="text-lg">No Content Available</div>
                    </div>
                </div>
            );
        }

        return (
            <div className="w-full h-[400px] bg-[#3B4252] rounded-lg overflow-hidden">
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    muted
                    autoPlay
                    loop={false}
                    playsInline
                    disablePictureInPicture
                    preload="metadata"
                    style={{ pointerEvents: 'none' }}
                    src={media.url}
                    onLoadStart={() => console.log(`Video on ${side} side started loading: ${media.name}`)}
                    onCanPlay={handleVideoCanPlay}
                    onEnded={handleVideoEnd}
                    onError={() => handleVideoError(media)}
                />
            </div>
        );
    };

    return (
        <div className="w-full max-w-[250px] 2xl:max-w-[300px] h-full bg-[#2E3440] rounded-[10px] 2xl:rounded-[15px] border border-[#3B4252] shadow-[7px_8px_0px_rgba(0,0,0,0.25)] p-4 flex flex-col gap-4">
            {/* Header */}
            <div className="text-center">
            </div>

            {/* Single Video Player */}
            <div className="flex-1 flex flex-col justify-center">
                <VideoPlayer media={currentMedia} />
            </div>

            {/* Status indicator */}
            <div className="text-center text-xs text-[#81A1C1]">
                {error ? (
                    <span className="text-red-400">Connection Error</span>
                ) : isLoading && (
                    <span>Loading content...</span>
                )}
            </div>
        </div>
    );
};

export default AdvertTab;