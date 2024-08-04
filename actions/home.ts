"use server";
import { NextApiRequest, NextApiResponse } from "next";

// Interface for YouPorn response
export interface YouPornResponse {
  success: boolean;
  data: {
    title: string;
    id: string;
    image: string;
    duration: string;
    views: string;
    rating: string;
    uploaded: string;
    upvoted: string;
    downvoted: string;
    models: string[];
    tags: string[];
  };
  source: string;
  assets: string[];
}

// Interface for XVideos response
export interface XVideosResponse {
  success: boolean;
  data: {
    map: any;
    title: string;
    id: string;
    image: string;
    duration: string;
    views: string;
    rating: string;
    uploaded: string;
    upvoted: string;
    downvoted: string;
    models: string[];
    tags: string[];
  };
  source: string;
  assets: string[];
}

// Function to fetch data from YouPorn API
export async function getImages(): Promise<YouPornResponse | null> {
  try {
    const response = await fetch('https://lust.scathach.id/youporn/random', { next: { revalidate: 60 } });

    if (!response.ok) {
      throw new Error(`Failed to fetch image data: ${response.statusText}`);
    }

    const data: YouPornResponse = await response.json();
    console.log('Image data:', data);
    return data || null;

  } catch (error) {
    console.error('Error fetching image data:', error);
    return null;
  }
}

// Function to fetch data from XVideos API
export async function getHome(): Promise<XVideosResponse | null> {
  try {
    const response = await fetch('https://lust.scathach.id/xvideos/random');

    if (!response.ok) {
      throw new Error(`Failed to fetch home data: ${response.statusText}`);
    }

    const data: XVideosResponse = await response.json();
    console.log('Home data:', data);
    return data || null;

  } catch (error) {
    console.error('Error fetching home data:', error);
    return null;
  }
}
