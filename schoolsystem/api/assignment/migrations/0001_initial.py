# Generated by Django 3.1.7 on 2021-03-22 05:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0016_auto_20210322_1349'),
    ]

    operations = [
        migrations.CreateModel(
            name='Assignment',
            fields=[
                ('code', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('status', models.SmallIntegerField(choices=[(1, 'draft'), (2, 'published')], default=1)),
                ('year', models.SmallIntegerField(choices=[(1, 'Grade 1'), (2, 'Grade 2'), (3, 'Grade 3'), (4, 'Grade 4'), (5, 'Grade 5'), (6, 'Grade 6')], default=1)),
                ('deadline', models.DateTimeField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('submitted', models.SmallIntegerField(default=0)),
                ('teacher', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.teacher')),
            ],
        ),
        migrations.CreateModel(
            name='Choice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='GradedAssignment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mark', models.SmallIntegerField(default=-1)),
                ('assignment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='assignment.assignment')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.student')),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('order', models.SmallIntegerField()),
                ('question_type', models.SmallIntegerField(choices=[(1, 'radio'), (2, 'checkbox'), (3, 'text')], default=1)),
                ('answer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='answer', to='assignment.choice')),
                ('assignment', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='assignment.assignment')),
                ('choices', models.ManyToManyField(to='assignment.Choice')),
            ],
            options={
                'index_together': {('assignment', 'order')},
            },
        ),
        migrations.CreateModel(
            name='StudentAnswer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='assignment.choice')),
                ('graded_assignment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='answers', to='assignment.gradedassignment')),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='assignment.question')),
            ],
        ),
    ]