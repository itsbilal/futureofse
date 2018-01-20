# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180107163213) do

  create_table "program_designs", force: :cascade do |t|
    t.integer "stage_response_id"
    t.string "term"
    t.string "course"
    t.text "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["stage_response_id"], name: "index_program_designs_on_stage_response_id"
  end

  create_table "program_views", force: :cascade do |t|
    t.integer "stage_response_id"
    t.text "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["stage_response_id"], name: "index_program_views_on_stage_response_id"
  end

  create_table "questions", force: :cascade do |t|
    t.integer "stage_response_id"
    t.integer "question"
    t.text "answer"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["stage_response_id"], name: "index_questions_on_stage_response_id"
  end

  create_table "stage_responses", force: :cascade do |t|
    t.integer "voter_id"
    t.integer "stage"
    t.string "stagetype"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["voter_id"], name: "index_stage_responses_on_voter_id"
  end

  create_table "voters", force: :cascade do |t|
    t.integer "cls", null: false
    t.string "name"
    t.string "email"
    t.boolean "current", null: false
    t.text "reason"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "uuid"
    t.index ["uuid"], name: "index_voters_on_uuid"
  end

end
