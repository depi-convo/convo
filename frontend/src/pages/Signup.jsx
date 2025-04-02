import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Signup() {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 text-center">
        Sign Up
      </h2>
      <form className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" placeholder="Enter your name" />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Enter your email" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>
    </div>
  );
}
