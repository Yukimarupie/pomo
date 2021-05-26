require 'rails_helper'

#実行したい時は以下コマンドをを実行
#bundle exec rspec spec/system/tasks_spec.rb
describe 'タスク管理機能', type: :system do
  describe '一覧表示機能'　do
    before do
      user_a = FactoryBot.create(:user) #ユーザーAを作成しておく
      FactoryBot.create(:task, name: '最初のユーザーAのタスク', user: user_a) #作成者がユーザーAであるタスクを作成しておく
    end

    context 'ユーザーAがログインしている時' do
      before do
        visit login_path #ユーザーAでログインする #visit [URL]で特定のURLへアクセスするという意味。
      end

      it 'ユーザーAが作成したタスクが表示される' do
       expect(page).to have_content '最初のユーザーAのタスク' # 作成済のタスクの名称が画面に表示されることを確認
       #page(画面)に期待するよ #「最初のタスク」という内容があるはずということを。
      end
    end

    context 'ユーザーBがログインしている時' do
      before do
        user_b = FactoryBot.create(:user) #ユーザーBを作成しておく
        visit login_path #ユーザーBでログインする

      end

      it 'ユーザーAが作成したタスクが表示されないこ' do
        #ユーザーAが作成したタスクが画面上に表示されていないことを確認
        expect(page).not_to have_content '最初のユーザーAのタスク'
      end
    end
  end

  describe '新規作成機能' do
    
  end
end
