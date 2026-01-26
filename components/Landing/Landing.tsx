"use client";
import {
  Camera,
  Heart,
  Loader,
  MessageCircle,
  Share2,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

import { Button } from "../ui/button";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

const Landing = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state?.auth.user);
  const { user: authUser, loading } = useUser();

  // While loading, show spinner
  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center flex-col">
        <Loader className="w-12 h-12 animate-spin mb-4" />
      </div>
    );
  }

  if (authUser) {
    router.replace("/feed");
    return null; // prevents rendering while redirect happens
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-rose-50">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Image src="/images/logo.png" alt="logo" width={140} height={140} />

            {!user && (
              <div className="flex items-center gap-4">
                <Link href="/auth/login">
                  <Button variant="ghost" className="font-medium">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-medium">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}

            {user && (
              <Link href="/feed">
                <Avatar>
                  <AvatarImage src={user.profilePicture} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main>
        <section className="relative overflow-hidden py-20 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
                Share Your Story,
                <br />
                <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                  Connect With Friends
                </span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Capture and share life&#39;s moments with the people who matter
                most. Join millions who are already sharing their stories on
                Photoflow.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-semibold text-lg px-8 py-7 transition-all duration-300 "
                  >
                    Get Started Free
                  </Button>
                </Link>
                <Link href="#">
                  <Button
                    size="lg"
                    variant="outline"
                    className="font-semibold text-lg px-8 py-7  border-2 hover:bg-gray-50"
                  >
                    Explore
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">10M+</div>
                <div className="mt-2 text-sm text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">50M+</div>
                <div className="mt-2 text-sm text-gray-600">Photos Shared</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">100M+</div>
                <div className="mt-2 text-sm text-gray-600">Likes Given</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">150+</div>
                <div className="mt-2 text-sm text-gray-600">Countries</div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Everything You Need to Share
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Powerful features to help you capture, edit, and share your
                moments with style
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center mb-4">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Instant Sharing
                </h3>
                <p className="text-gray-600">
                  Share photos and videos instantly with your followers. Add
                  filters and effects to make your content stand out.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Engage & Connect
                </h3>
                <p className="text-gray-600">
                  Like, comment, and save your favorite posts. Build meaningful
                  connections with friends and creators.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Direct Messages
                </h3>
                <p className="text-gray-600">
                  Send private messages, share posts, and have conversations
                  with friends in a secure environment.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Stories
                </h3>
                <p className="text-gray-600">
                  Share temporary updates that disappear after 24 hours. Perfect
                  for sharing daily moments and behind-the-scenes.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Follow & Discover
                </h3>
                <p className="text-gray-600">
                  Follow your friends and discover new creators. Explore
                  trending content and find inspiration daily.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-orange-50 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center mb-4">
                  <Share2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Easy Sharing
                </h3>
                <p className="text-gray-600">
                  Share posts to your story or send them directly to friends.
                  Cross-post to other platforms with one tap.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-rose-500 via-pink-500 to-orange-500 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to Start Sharing?
            </h2>
            <p className="text-xl mb-10 text-rose-50">
              Join millions of users sharing their stories. Create your account
              today and start connecting with friends.
            </p>
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-white text-rose-500 hover:bg-gray-100 font-semibold text-lg px-10 py-7"
              >
                Sign Up Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Safety
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Social</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm">© 2025 Photoflow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
