class TasksController < ApplicationController
  before_action :set_task, only: [:destroy, :edit, :update, :done]

  def index
    # もしdone: false == @task.not_done.allにいれる done: trueなら@task.done.allにいれる
    # Client.where(locked: true)
    # @tasks = Task.all.reverse
    #こっちにはdone: trueになったら完了タスクを出したい

    @tasks_undone = Task.where(done: false)
    #今日の日付より大きいもの
    @tasks_done = Task.where(done: true).where('created_at >= ?', Time.current.beginning_of_day).order(id: "DESC")
    # binding.pry
    @task = Task.new #remote: trueのために追加
  end

  def create
    @task = Task.new(task_params)
    respond_to do |format|
      if @task.save!
        format.js #create.js.erbが呼び出される。 フロント側の処理。
      else
        format.js { render :errors }
      end
    end
  end

  def new; end

  def edit
  end

  def update
    respond_to do |format|
      if @task.update!(task_params)
        format.json { render :json => @task } #サーバー側の処理
        format.js #create.js.erbが呼び出される。 フロント側の処理。
      else
        format.json { render :new }
        format.js { render :errors }
      end
    end
  end

  def destroy
    @task.destroy!
  end

  def done
    # binding.pry
    @task.update(done: true) #doneをtrueに。
    # format.js { render :js => @task }
  end

  private

  def task_params
    params.require(:task).permit(:name, :done)
  end

  def set_task
    # binding.pry
    @task = Task.find(params[:id])
  end
end

