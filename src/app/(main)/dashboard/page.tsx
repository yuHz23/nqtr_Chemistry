import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { chapters, userStats } from "@/lib/data/mock";
import { Flame, Trophy, Target, Zap } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-8 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Chào mừng trở lại, {userStats.name} 👋</h1>
        <p className="text-slate-400">Tiếp tục hành trình chinh phục môn Hóa học 12 CTST.</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Card className="glass-card">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Chuỗi học tập</p>
              <h3 className="text-3xl font-bold text-amber-400">{userStats.streak} Ngày</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
              <Flame className="h-6 w-6 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Điểm kinh nghiệm</p>
              <h3 className="text-3xl font-bold text-blue-400">{userStats.xp} XP</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Zap className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Đề đã hoàn thành</p>
              <h3 className="text-3xl font-bold text-emerald-400">{userStats.completedExams} Đề</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Target className="h-6 w-6 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-none bg-gradient-to-br from-blue-500/20 to-purple-500/20">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-300 mb-1">Xếp hạng tuần</p>
              <h3 className="text-3xl font-bold text-white"># {userStats.rank}</h3>
            </div>
            <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-white" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chapters list */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Tiến độ Học tập</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {chapters.map((chapter) => (
          <Card key={chapter.id} className="glass-card overflow-hidden hover:border-slate-600 transition-colors cursor-pointer text-left">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row items-center justify-between p-6">
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                  <h3 className="font-semibold text-lg text-slate-100">{chapter.title}</h3>
                  <p className="text-sm text-slate-400">{chapter.totalQuestions} câu hỏi</p>
                </div>
                
                <div className="w-full md:w-1/3 flex flex-col justify-center items-start px-0 md:px-8">
                  <div className="flex justify-between w-full mb-2">
                    <span className="text-sm font-medium">Hoàn thành</span>
                    <span className="text-sm font-medium text-blue-400">{chapter.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                      style={{ width: `${chapter.progress}%` }}
                    />
                  </div>
                </div>

                <div className="w-full md:w-1/4 flex justify-end mt-4 md:mt-0">
                  <Badge variant={
                    chapter.masterLevel === "Giỏi" ? "success" : 
                    chapter.masterLevel === "Khá" ? "default" : 
                    chapter.masterLevel === "Trung bình" ? "warning" : "secondary"
                  }>
                    {chapter.masterLevel}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
